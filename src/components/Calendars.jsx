import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { graphql, StaticQuery, navigate } from 'gatsby';

const Calendars = ({ calendars, selected }) => (
  <div className="calendars">
    {calendars
      && calendars.map(({ node: calendar }) => (
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(`/program/${calendar.slug}/`);
          }}
          href={`/program/${calendar.slug}/`}
          plain
          className={['calendarPicker', selected === calendar.slug ? 'selected' : ''].join(' ')}
          key={calendar.id}
        >
          <div className={['bigRound', calendar.slug.split('/')[0]].join(' ')}>
            <span>{calendar.name[0]}</span>
          </div>
          <div className="label">{calendar.name}</div>
        </Button>
      ))}
  </div>
);

Calendars.propTypes = {
  calendars: PropTypes.arrayOf(PropTypes.shape),
  selected: PropTypes.string,
};

Calendars.defaultProps = {
  calendars: [],
  selected: null,
};

export default (props) => (
  <StaticQuery
    query={graphql`
      query CalendarsQuery {
        allCalendar(filter: { visible: { eq: true } }) {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
      }
    `}
    render={(data) => <Calendars calendars={data.allCalendar.edges} {...props} />}
  />
);
