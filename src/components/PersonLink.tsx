import { FC } from 'react';
import { Person } from '../types';

interface IPersonLink {
  name: Person['name'];
  slug: Person['slug'];
  sex: Person['sex'];
  onClick: () => void;
}
export const PersonLink: FC<IPersonLink> = ({
  name, onClick, slug, sex,
}) => {
  return (
    <a
      href={`#/people/${slug}`}
      onClick={(e) => {
        e.preventDefault(); onClick();
      }}
      className={sex.toLowerCase() === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </a>
  );
};
