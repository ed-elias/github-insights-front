import { gql } from '@apollo/client';

const getRepoCommitInfoPaginated = gql`
    query($orderBy: String) {
        getInsights(orderBy: $orderBy){
            additions
            deletions
            commits
            user{
                login
                name
                id
            }
        }
    }
`;

export { getRepoCommitInfoPaginated }
