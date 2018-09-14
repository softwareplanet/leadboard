import * as React from 'react';
import { connect } from 'react-redux';
import Stage from '../../../../../models/Stage';
import { loadStages } from '../../../settingActions';
import * as styles from './Stages.css'
import StageView from './StageView/StageView';
import Funnel from '../../../../../models/Funnel';

interface Props {
  stages: Stage[];
  selectedFunnel: Funnel;

  loadStages(funnelId: string): void;
}

class Stages extends React.Component<Props> {

  public componentDidMount() {
    this.props.loadStages(this.props.selectedFunnel._id);
  }

  public render() {
    return (
      <div className={styles.content}>
        <ul className={styles.stagesList}>
          {this.props.stages.map(stage => {
            return (
              <li>
                <StageView
                  key={stage._id}
                  stage={stage}/>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  stages: state.settings.stages,
  selectedFunnel: state.settings.selectedFunnel,
});

export default connect(mapStateToProps, {loadStages})(Stages)
