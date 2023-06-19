import './App.scss';
import {
  Route, Routes, Navigate, NavLink,
} from 'react-router-dom';
import classNames from 'classnames';
// eslint-disable-next-line import/no-cycle
import { PeopleTable } from './components/PeopleTable';

export const App = () => {
  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink
              to="/"
              className={({ isActive }) => classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
            >
              Home
            </NavLink>

            <NavLink
              to="people"
              end
              className={({ isActive }) => classNames('navbar-item',
                { 'has-background-grey-lighter': isActive })}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />

            <Route
              path="people"
              element={(
                <>
                  <h1 className="title">People Page</h1>
                  <PeopleTable />
                </>
              )}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
