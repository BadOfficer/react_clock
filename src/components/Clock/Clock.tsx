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
      const now = getCurrentTime();

      this.setState({
        today: now,
      });

      // eslint-disable-next-line no-console
      console.log(now);
    }, 1000);
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
