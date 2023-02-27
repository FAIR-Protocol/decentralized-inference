import { STATIC_ADDRESS } from "@/constants";
import { gql } from "@apollo/client";

export const GET_IMAGES_TXIDS = gql`
  query GET_IMAGES_TXIDS {
    transactions(
      first: 100,
      tags: [
        {
          name: "Content-Type",
          values: ["image/png"]
        }
      ]
    ) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

export const LIST_MODELS_QUERY = gql`
  query LIST_MODELS_QUERY {
    transactions(
      first:100,
      tags: [
        {
          name: "AppName",
          values: ["Fair-protocol"]
        },
      ]
    )
    {
      edges {
        node {
          id
          tags {
            name
            value
          }
        }
      }
    }
  }
`;

export const QUERY_REGISTERED_MODELS = gql`
  query QUERY_REGISTERED_MODELS {
    transactions(
      first: 25,
      recipients:["${STATIC_ADDRESS}"],
      tags: [
        {
              name: "App-Name",
              values: ["Fair Protocol"]
        },
        {
              name: "App-Version",
              values: ["v0.01"]
        },
        {
          name: "Opearation-Name",
          values: ["Model Creation"]
        }
      ]
    )
    {
        edges {
            cursor
            node {
                id
                anchor
                signature
                recipient
                owner {
                    address
                    key
                }
                fee {
                    winston
                    ar
                }
                quantity {
                    winston
                    ar
                }
                data {
                    size
                    type
                }
                tags {
                    name
                    value
                }
                block {
                    id
                    timestamp
                    height
                    previous
                }
                bundledIn {
                    id
                }
            }
        }
    }
  }
`;

/*
  registered operators tags [
    {
          name: "App-Name",
          values: ["Fair Protocol"]
    },
    {
          name: "App-Version",
          values: ["v0.01"]
    },
    {
      name: "Model-Transaction",
      values: ["${txid}"]
    },
    {
      name: "Operation-Name",
      values: ["Operator Registration"]
    }
  ],
*/

/* Cancelled operators tags[
  {
    name: "App-Name",
    values: ["Fair Protocol"]
  },
  {
    name: "App-Version",
    values: ["v0.01"]
  },
  {
    name: "Model-Transaction",
    values: ["${txid}"]
  },
  {
    name: "Operation-Name",
    values: ["Operator Cancellation"]
  }
], */

export const QUERY_REGISTERED_OPERATORS = gql`
  query QUERY_REGISTERED_OPERATORS($tags: [TagFilter!]) {
    transactions(
      first: 1,
      recipients:["${STATIC_ADDRESS}"],
      tags: $tags
      sort: HEIGHT_DESC
    )
    {
        edges {
            cursor
            node {
                id
                anchor
                signature
                recipient
                owner {
                    address
                    key
                }
                fee {
                    winston
                    ar
                }
                quantity {
                    winston
                    ar
                }
                data {
                    size
                    type
                }
                tags {
                    name
                    value
                }
                block {
                    id
                    timestamp
                    height
                    previous
                }
                bundledIn {
                    id
                }
            }
        }
    }
  }
`;

export const QUERY_CANCELLED_OPERATORS = gql`
  query QUERY_CANCELLED_OPERATORS($tags: [TagFilter!]) {
    transactions(
      first: 1,
      recipients:["${STATIC_ADDRESS}"],
      tags: $tags
      sort: HEIGHT_DESC
    )
    {
      edges {
        cursor
        node {
          id
          anchor
          signature
          recipient
          owner {
            address
            key
          }
          fee {
            winston
            ar
          }
          quantity {
            winston
            ar
          }
          data {
            size
            type
          }
          tags {
            name
            value
          }
          block {
            id
            timestamp
            height
            previous
          }
          bundledIn {
            id
          }
        }
      }
    }
  }
`;

  // availability could be replaced with something more meaningful
/* export const QUERY_OPERATORS_AVAILABILITY = gql`
  query QUERY_OPERATORS_AVAILABILITY($tags: [TagFilter!]) {
    transactions (
      recipients:["${STATIC_ADDRESS}"],
      tags: $tags
      sort: HEIGHT_DESC
    )
    {
      edges {
        cursor
        node {
          id
          anchor
          signature
          recipient
          owner {
            address
            key
          }
          fee {
            winston
            ar
          }
          quantity {
            winston
            ar
          }
          data {
            size
            type
          }
          tags {
            name
            value
          }
          block {
            id
            timestamp
            height
            previous
          }
          bundledIn {
            id
          }
        }
      }
    }
  }
`; */

export const QUERY_OPERATOR_RESULTS_RESPONSES = gql`
  query results_responses($tagsResults: [TagFilter!], $tagsRequests: [TagFilter!], $owners: [String!]) {
    results: transactions (
      tags: $tagsResults
      owners: $owners
      sort: HEIGHT_DESC
    ) {
      edges {
        node {
          id
          owner { address }
        }
      }
    },
    requests: transactions (
      tags: $tagsRequests
      recipients: $owners
      sort: HEIGHT_DESC
    ) {
      edges {
        node {
          id
          recipient
          owner { address }
        }
      }
    }
  }
`;

export const QUERY_OPERATOR_HISTORY = gql`
  query history ($address: String!, $tags: [TagFilter!]) {
    owned: transactions (
      tags: $tags
      owners: [ $address ]
    ) {
      edges {
        cursor
        node {
          id
          anchor
          signature
          recipient
          owner {
            address
            key
          }
          fee {
            winston
            ar
          }
          quantity {
            winston
            ar
          }
          data {
            size
            type
          }
          tags {
            name
            value
          }
          block {
            id
            timestamp
            height
            previous
          }
          bundledIn {
            id
          }
        }
      }
    }

    received: transactions (
      tags: $tags
      recipients: [ $address ]
    ) {
      edges {
        cursor
        node {
          id
          anchor
          signature
          recipient
          owner {
            address
            key
          }
          fee {
            winston
            ar
          }
          quantity {
            winston
            ar
          }
          data {
            size
            type
          }
          tags {
            name
            value
          }
          block {
            id
            timestamp
            height
            previous
          }
          bundledIn {
            id
          }
        }
      }
    }
  }
`