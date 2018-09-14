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

  public componentDidMount() {
    this.props.loadStages('5b9a3676d7c72c478f2fa42e');
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
