/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import { Person } from '../types';
// eslint-disable-next-line import/no-cycle
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );

        const data = await response.json();

        setPeople(data);
        setIsLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        setErrorMessage('Something went wrong');
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-shadow

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
        {errorMessage && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              <>
                {people.map(
                  ({
                    name, sex, born, died, motherName, fatherName, slug,
                  }) => (
                    <tr
                      data-cy="person"
                      key={slug}
                      className={
                        selectedPerson === name ? 'has-background-warning' : ''
                      }
                    >
                      <td>
                        <PersonLink
                          onClick={() => setSelectedPerson(name)}
                          name={name}
                          slug={slug}
                          sex={sex}
                        />
                      </td>
                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>

                      <td>
                        {motherName ? (
                          people.some(
                            (person) => motherName === person.name,
                          ) ? (
                            // eslint-disable-next-line @typescript-eslint/indent
                            <PersonLink
                                onClick={() => setSelectedPerson(motherName)}
                                slug={slug}
                                sex="f"
                                name={motherName}
                              // eslint-disable-next-line react/jsx-closing-bracket-location
                              />
                            ) : (
                              motherName
                            )
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>
                        {fatherName ? (
                          people.some(
                            (person) => fatherName === person.name,
                          ) ? (
                            // eslint-disable-next-line @typescript-eslint/indent
                            <PersonLink
                                onClick={() => setSelectedPerson(fatherName)}
                                slug={slug}
                                sex="m"
                                name={fatherName}
                              // eslint-disable-next-line react/jsx-closing-bracket-location
                              />
                            ) : (
                              fatherName
                            )
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ),
                )}
              </>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
