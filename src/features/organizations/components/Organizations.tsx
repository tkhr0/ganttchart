import { useQuery } from "urql";

import { graphql } from "gql";
import type { Organization, Project, Team } from "gql/graphql";

const organizationQuery = graphql(`
  query organizations {
    organizations {
      name

      projects {
        name

        teams {
          name
        }
      }
    }
  }
`);

export const Organizations = (): JSX.Element => {
  const [{ data, fetching }] = useQuery({ query: organizationQuery });

  if (fetching) {
    return <></>;
  }

  return (
    <ul>
      {data?.organizations.map((organization: Organization, i: number) => {
        return (
          <li key={i}>
            <p>{organization.name}</p>
            <ul>
              {organization.projects.map((project: Project, j: number) => {
                return (
                  <li key={j}>
                    <p>{project.name}</p>
                    <ul>
                      {project.teams.map((team: Team, k) => {
                        return <li key={k}>{team.name}</li>;
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};
