import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { Box, Anchor } from 'grommet';
import MaxWidthContainer from './MaxWidthContainer';

const Footer = ({ data }) => (
  <Box background="dark-1" pad={{ vertical: 'medium' }} margin={{ top: 'medium' }}>
    <MaxWidthContainer>
      <div>
        <p>{data.description}</p>
        <h3>Kontakt oss</h3>
        {data.contacts.map((contact) => (
          <p>
            <strong>{contact.name}</strong>
            {`, ${contact.title}`}
            <br />
            {`${contact.phone}, `}
            <Anchor href={`mailto:${contact.email}`}>{contact.email}</Anchor>
          </p>
        ))}
        <p>
          <small>
            © 2009&ndash;
            {new Date().getFullYear()}
            {' Nadderud speidergruppe'}
          </small>
        </p>
      </div>
    </MaxWidthContainer>
  </Box>
);

Footer.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
      }).isRequired,
    ),
  }),
};

Footer.defaultProps = {
  data: { description: '', contacts: [] },
};

export default () => (
  <StaticQuery
    query={graphql`
      query {
        markdownRemark(fields: { slug: { eq: "/" } }) {
          frontmatter {
            description
            contacts {
              name
              title
              email
              phone
            }
          }
        }
      }
    `}
    render={(data) => <Footer data={data.markdownRemark.frontmatter} />}
  />
);
