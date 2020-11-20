import * as React from 'react';
import { data, DetailData, MasterData } from './model';
import { RenderChivato } from './common';


type MasterComponentState = {
    masterData: MasterData;
}
export class MasterComponent extends React.Component<{}, MasterComponentState> {
    phase: string = "new";

    state: MasterComponentState = { masterData: data };

    handleChangeMaster = () => {
        const newData = { ...this.state.masterData };
        newData.masterText = newData.masterText + 'z';
        this.setState({ masterData: newData });
    }

    handleChangeDetail = (detail: DetailData) => {
        const { masterData } = this.state;
        const detailIndex = masterData.childs.findIndex(x => x === detail);
        const newData = { ...this.state.masterData };
        const newChilds = newData.childs.slice();
        newData.childs = newChilds;
        const newDetail = { ...detail };
        newDetail.detailText = newDetail.detailText + 'z';
        newChilds[detailIndex] = newDetail;

        this.setState({ masterData: newData });
    }

    componentDidUpdate() {
        this.phase = "update";
    }

    render() {
        const { masterData } = this.state;
        const childs = masterData.childs.map(x => <DetailComponent key={x.detailText} onChangeDetail={this.handleChangeDetail} detailData={x} />);
        return <div style={{ border: '1px solid blue' }}>
            {masterData.masterText} <RenderChivato phase={this.phase} />
            {childs}

            <button onClick={this.handleChangeMaster}>ChangeMaster</button>
        </div>
    }
}

type DetailComponentProps = {
    detailData: DetailData;
    onChangeDetail: (detail: DetailData) => void;
}

class DetailComponent extends React.PureComponent<DetailComponentProps> {
    phase: string = "new";

    componentDidUpdate() {
        this.phase = "update";
    }

    render() {
        const { detailData, onChangeDetail: handleChangeDetail } = this.props;
        return <div style={{ marginLeft: '50px', border: '1px solid black' }}>
            {detailData.detailText} <RenderChivato phase={this.phase} />
            <button onClick={() => handleChangeDetail(detailData)}>ChangeDetail</button>
        </div>
    }
}


