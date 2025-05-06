# Fullstack Portfolio Project

This project is a fullstack maritime database management application done for my NAPA interview.

It's a three-part project which consists of:

1. **ASP .NET Core with C#** - Backend REST implementation.
2. **Angular with TypeScript** - Frontend UI for managing and viewing data.
3. **PostgreSQL** - The SQL database used for storing data.

Frontend packages used:

1. **ngx-charts** - A popular library used for rendering different types of charts.
2. **tailwind-css** - A utility-first CSS framework for creating custom designs quickly.
3. **NgRx** - A state management library for Angular applications, used for managing the application's state in a predictable way.
4. **jasmine** - A testing framework for writing unit tests and assertions in Angular.

It provides all CRUD interactions and data visualization via the ngx-charts library. The user can order the columns ascending or descending and search for data in the tables. The table of last year's visited countries is actually a table view that's dynamically populated with entries that meet the criteria.

Backend CRUD operations are fully covered by tests whilst frontend is only partially covered.

"maritime" database structure:

```sh
         Table         |     Column      |          Data Type
-----------------------+-----------------+-----------------------------
 Ports                 | Id              | integer
 Ports                 | Name            | character varying
 Ports                 | Country         | character varying
 Ships                 | Id              | integer
 Ships                 | Name            | character varying
 Ships                 | MaxSpeed        | integer
 VisitedCountries      | Id              | bigint
 VisitedCountries      | CountryName     | character varying
 Voyages               | Id              | integer
 Voyages               | VoyageDate      | date
 Voyages               | DeparturePortId | integer
 Voyages               | ArrivalPortId   | integer
 Voyages               | VoyageStart     | timestamp with time zone
 Voyages               | VoyageEnd       | timestamp with time zone
```

## Database Setup

**Requirements:** PostgreSQL

1. Make sure you are working in the directory of the file `maritime_dump.sql` (otherwise you must specify the full path), and open a terminal there.
2. Create and import all data from the "maritime" database using:
   ```sh
   psql -U your_username -W -f maritime_dump.sql postgres
   ```
   This will create the "maritime" database and set up the tables and data.

## ASP .NET Core Setup

**Requirements:** .NET SDK (version >= 6.0), PostgreSQL

1. Make sure you have the database link correctly set.
2. Navigate to `MaritimeApi/appsettings.json` and change the username and password with your PostgreSQL database credentials.
3. Open a terminal in the `MaritimeApi` folder.
4. First off, install dependencies:
   ```sh
   dotnet restore
   ```
5. Then, run the server and keep it open:
   ```sh
   dotnet run
   ```

## Angular Setup

**Requirements:** Node.js (version >= 14.0), Angular CLI, npm

1. Open a terminal in the `maritime-frontend` folder.
2. First off, install dependencies:
   ```sh
   npm install
   ```
3. Then, run the server and keep it open:
   ```sh
   ng serve
   ```

## Testing

In the `MaritimeApi` folder, you can run tests to check CRUD functionalities:

```sh
dotnet test
```

In the `maritime-frontend` folder, you can run tests to check frontend functionalities:

```sh
ng test
```

## Preview

Voyages:
![Voyages](https://github.com/RaduCot/maritime-fullstack/blob/master/images/voyages.png)

Ships:
![Ships](https://github.com/RaduCot/maritime-fullstack/blob/master/images/ships.png)

Ports:
![Ports](https://github.com/RaduCot/maritime-fullstack/blob/master/images/ports.png)

Countries from last year:
![Countries](https://github.com/RaduCot/maritime-fullstack/blob/master/images/countries.png)

Data addition:
![Data Add](https://github.com/RaduCot/maritime-fullstack/blob/master/images/add-data.png)

Data editing:
![Data Edit](https://github.com/RaduCot/maritime-fullstack/blob/master/images/edit-data.png)

Data removal:
![Data Delete](https://github.com/RaduCot/maritime-fullstack/blob/master/images/delete-data.png)
