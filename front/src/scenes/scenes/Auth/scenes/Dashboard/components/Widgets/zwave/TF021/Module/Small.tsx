import React, { Component } from 'react';

import { observer } from 'mobx-react';
import Model from '../model/Model';
import Service from '../model/Service';
import Temperature from './Temperature';
import Icon from './Icon';

import styles from './index.scss';
import { ScreenSize } from '~/constants/enums';

type Props = {
    model: Model;
    service: Service | null;
    edit?: boolean;
};

class Small extends Component<Props> {
    render() {
        const { service, edit } = this.props;

        if (!service) return null;

        const zwaveModel = service.getDataByNodeId;

        if (!zwaveModel) return null;

        return (
            <div className={styles.wrap}>
                <Icon
                    zwaveModel={zwaveModel}
                    service={service}
                    edit={edit}
                    size={ScreenSize.small}
                />
                <Temperature size={ScreenSize.small} zwaveModel={zwaveModel} />
            </div>
        );
    }
}

export default observer(Small);
