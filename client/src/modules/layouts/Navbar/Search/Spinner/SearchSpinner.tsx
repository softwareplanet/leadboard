import * as React from 'react';
import * as styles from './SearchSpinner.css';

interface Props {
  className: string;
}

export default class SearchSpinner extends React.Component<Props> {

  public render() {
    return (
      <div {...this.props}>
        <div className={styles.container}>
          <div className={styles.loader} />
        </div>
      </div>
    );
  }
}
