import * as React from 'react';
import { connect } from 'react-redux';
import Funnel from '../../../../../models/Funnel';
import Stage from '../../../../../models/Stage';
import { loadStages } from '../../../settingActions';
import * as styles from './Stages.css'
import StageView from './StageView/StageView';

interface Props {
  stages: Stage[];
  selectedFunnel: Funnel;

  loadStages(funnelId: string): void;
}

class Stages extends React.Component<Props> {

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selectedFunnel._id !== this.props.selectedFunnel._id){
      this.props.loadStages(nextProps.selectedFunnel._id);
    }
  }

  

  public render() {
    return (
      <div className={styles.content}>
        <ul className={styles.stagesList}>
          {this.props.stages.map(stage => {
            return (
              <li key={stage._id}>
                <StageView stage={stage} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}



const mapStateToProps = (state: any) => ({
  selectedFunnel: state.settings.selectedFunnel,
  stages: state.settings.stages,
});

export default connect(mapStateToProps, { loadStages })(Stages)
