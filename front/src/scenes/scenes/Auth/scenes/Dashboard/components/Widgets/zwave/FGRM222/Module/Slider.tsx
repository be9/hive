import React, { Component } from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { IZwaveNode } from '~/store/z-wave/IZwaveNode';
import { Slider } from '@blueprintjs/core';
import { Types } from '../model/types';
import Service from '../model/Service';

import Model from '../model/Model';
import styles from './index.scss';

type Props = {
    zwaveModel: IZwaveNode;
    service: Service;
    model: Model;
    edit?: boolean;
};

class SliderWrap extends Component<Props> {
    @observable
    private value: number = 0;

    @observable
    private changing: boolean = false;

    componentDidMount() {
        this.setNodeValue();
    }

    componentDidUpdate() {
        if (!this.changing) {
            this.setNodeValue();
        }
    }

    @action
    setNodeValue = () => {
        const { zwaveModel } = this.props;

        const positionParam = zwaveModel.values.find(
            x => x.value_id === `${x.node_id}-${Types.Position}`
        );

        const position = positionParam ? positionParam.value : 0;

        this.value = Number(position);
    };

    @action
    change = (value: number) => {
        this.value = value;
        this.changing = true;
    };

    @action
    changePosition = (value: number) => {
        const { service, zwaveModel } = this.props;

        this.changing = false;
        service.setRollerPosition(zwaveModel, value);
    };

    render() {
        const { edit, zwaveModel } = this.props;

        zwaveModel.values.find(x => x.value_id === `${x.node_id}-${Types.Position}`);

        return (
            <Slider
                className={styles.slider}
                min={0}
                max={99}
                stepSize={10}
                value={this.value}
                labelStepSize={30}
                onChange={this.change}
                onRelease={this.changePosition}
                disabled={edit}
                vertical
            />
        );
    }
}

export default observer(SliderWrap);
