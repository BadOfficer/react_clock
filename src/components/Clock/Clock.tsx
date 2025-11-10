import React from 'react';
import { getCurrentTime } from '../../helpers/getCurrentTime';

interface State {
  today: string;
}

interface Props {
  clockName: string;
}

export class Clock extends React.Component<Props, State> {
  state: Readonly<State> = {
    today: getCurrentTime(),
  };

  clockId = 0;

  handleChangeTime = () => {
    const now = getCurrentTime();

    this.setState({
      today: now,
    });

    // eslint-disable-next-line no-console
    console.log(now);
  };

  componentDidMount(): void {
    this.clockId = window.setInterval(() => {
      this.handleChangeTime();
    }, 1000);
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const { clockName } = this.props;

    if (prevProps.clockName !== clockName) {
      // eslint-disable-next-line no-console
      console.warn(`Renamed from ${prevProps.clockName} to ${clockName}`);
    }
  }

  componentWillUnmount(): void {
    window.clearInterval(this.clockId);
  }

  render() {
    const { today } = this.state;
    const { clockName } = this.props;

    return (
      <div className="Clock">
        <strong className="Clock__name">{clockName}</strong>

        {' time is '}

        <span className="Clock__time">{today}</span>
      </div>
    );
  }
}
