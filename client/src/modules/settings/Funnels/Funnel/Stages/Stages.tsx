import * as React from 'react';
import { connect } from 'react-redux';
import Stage from '../../../../../models/Stage';
import { loadStages } from '../../../settingActions';
import * as styles from './Stages.css'
import StageView from './StageView/StageView';

interface Props {
  funnelId: string;
  stages: Stage[];

  loadStages(funnelId: string): void;
}

class Stages extends React.Component<Props> {

  public componentDidMount() {
    this.props.loadStages(this.props.funnelId);
  }

  public render() {
    return (
      <div className={styles.content}>
        <div className={styles.stagesList}>
          {this.props.stages.map(stage => {
            return (
              <StageView
                key={stage._id}
                stage={stage}/>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  stages: state.funnelSettings.stages,
});

export default connect(mapStateToProps, {loadStages})(Stages)
