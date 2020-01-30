import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { compose } from "redux";
import { Button } from "antd";

import { getDotaSeries } from "../../../redux/dota/dota-actions";
import { DotaState } from "../../../redux/dota/dota-types";
import { ReduxState } from "../../../redux/redux-state";
import EsportsListContainer from "../common/list-view/EsportsListContainer";
import EsportsCalendarContainer from "../common/EsportsCalendarContainer";
import PageHeader from "../../common/PageHeader";
import { ESportsSeries } from "../../../../types/esports-api/esports-series.model";
import {
  parseISOStringToDate,
  getEsportsTournamentsForCalendarFromSeries
} from "../../../../helpers/utils";

interface StateProps extends RouteComponentProps<any> {
  dota: DotaState;
}
interface DispatchProps {
  getDotaSeries;
}
type Props = StateProps & DispatchProps;
interface State {
  isListView: boolean;
  thisMonthCalled: number;
}

class DotaPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const today = new Date();

    this.state = {
      isListView: false,
      thisMonthCalled: today.getMonth()
    };
  }

  componentDidMount() {
    // if (this.props.dota.series.length < 1) {
    //   const today = new Date();
    //   this.props.getDotaSeries(today.getFullYear(), today.getMonth());
    // }
  }

  toggleView = () =>
    this.setState(prevState => ({
      isListView: !prevState.isListView
    }));

  selectCalendarTournament = info => {
    const { history } = this.props;
    if (history) history.push(`/esports/dota/${info.event.id}`);
  };

  selectTournament = (id: number) => {
    return () => {
      if (this.props.history) this.props.history.push(`/esports/dota/${id}`);
    };
  };

  getTournamentEvents = (fetchInfo, successCallback, failureCallback) => {
    console.log("fetchinfo", fetchInfo);
    if (this.props.dota.series.length < 1) {
      const today = new Date();
      this.props
        .getDotaSeries(today.getFullYear(), today.getMonth())
        .then(data => {
          successCallback(getEsportsTournamentsForCalendarFromSeries(data));
        });
    } else {
      // Get current month
      const middleMS =
        (fetchInfo.start.getTime() + fetchInfo.end.getTime()) / 2;
      const middleDate = new Date(middleMS);
      const currentMonth = middleDate.getMonth();
      const currentYear = middleDate.getFullYear();

      this.props.getDotaSeries(currentYear, currentMonth).then(data => {
        successCallback(getEsportsTournamentsForCalendarFromSeries(data));
      });

      // const { dota } = this.props;
      // // Check first and last dates and compare to current month on calendar
      // if (dota.series.length > 0) {
      //   let latestDate;
      //   let earliestDate;
      //   let latestMS;
      //   let earliestMS;

      //   for (let i = 0; i < dota.series.length; i++) {
      //     if (dota.series[i].beginAt) {
      //       const latestISO = dota.series[i].beginAt;
      //       latestDate = parseISOStringToDate(latestISO);
      //       latestMS = latestDate.getTime();
      //       break;
      //     }
      //   }

      //   for (let i = dota.series.length - 1; i > -1; i--) {
      //     if (dota.series[i].beginAt) {
      //       const earliestISO = dota.series[i].beginAt;
      //       earliestDate = parseISOStringToDate(earliestISO);
      //       earliestMS = earliestDate.getTime();
      //       break;
      //     }
      //   }

      //   // ?? options for when to make request for more events data:
      //   /** 1. determine whether closer to later or earlier and then detrmine
      //    whether within 2 months to make request
      //   2. immediately compare both latest and earliest by using month to convert back
      //   to date but first of month / end of month then get time again and compare MS
      //   */

      //   // after obtaining month, use to create date from 1st
      //   const firstCurrentMonth = new Date(currentYear, currentMonth, 1);
      //   const firstCurrentMS = firstCurrentMonth.getTime();
      //   const endCurrentMonth = new Date(currentYear, currentMonth, 28);
      //   const endCurrentMS = endCurrentMonth.getTime();
      //   const millisecInADay = 86400000;
      //   const maxMSIn2Months = millisecInADay * 62;

      //   // If within 2 months of earliest date, make request
      //   if (firstCurrentMS - earliestMS <= maxMSIn2Months) {
      //     // this.props.getDotaSeries(currentYear, currentMonth);
      //     console.log("make request earlier");
      //   } else if (latestMS - endCurrentMS <= maxMSIn2Months) {
      //     // this.props.getDotaSeries(currentYear, currentMonth);
      //     console.log("make request later");
      //   }
      // }
    }
  };

  render() {
    return (
      <div>
        <PageHeader title="Dota 2" isLoading={this.props.dota.isFetching} />
        <div className="more-btn">
          <Button onClick={this.toggleView} className="right">
            Show {this.state.isListView ? "Calendar" : "List"} View
          </Button>
        </div>
        {this.state.isListView ? (
          <EsportsListContainer
            series={this.props.dota.series}
            selectTournament={this.selectTournament}
          />
        ) : (
          <EsportsCalendarContainer
            selectTournament={this.selectCalendarTournament}
            getEvents={this.getTournamentEvents}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  dota: state.dota
});

const mapDispatchToProps = {
  getDotaSeries
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DotaPage);
