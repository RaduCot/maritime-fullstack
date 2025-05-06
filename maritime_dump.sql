--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: maritime; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE maritime WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE maritime OWNER TO postgres;

\connect maritime

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Ports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ports" (
    "Id" integer NOT NULL,
    "Name" character varying(255) NOT NULL,
    "Country" character varying(255) NOT NULL
);


ALTER TABLE public."Ports" OWNER TO postgres;

--
-- Name: Ports_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ports_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Ports_Id_seq" OWNER TO postgres;

--
-- Name: Ports_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ports_Id_seq" OWNED BY public."Ports"."Id";


--
-- Name: Ships; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ships" (
    "Id" integer NOT NULL,
    "Name" character varying(255) NOT NULL,
    "MaxSpeed" integer NOT NULL
);


ALTER TABLE public."Ships" OWNER TO postgres;

--
-- Name: Ships_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ships_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Ships_Id_seq" OWNER TO postgres;

--
-- Name: Ships_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ships_Id_seq" OWNED BY public."Ships"."Id";


--
-- Name: Voyages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Voyages" (
    "Id" integer NOT NULL,
    "VoyageDate" date NOT NULL,
    "DeparturePortId" integer NOT NULL,
    "ArrivalPortId" integer NOT NULL,
    "VoyageStart" timestamp with time zone NOT NULL,
    "VoyageEnd" timestamp with time zone NOT NULL
);


ALTER TABLE public."Voyages" OWNER TO postgres;

--
-- Name: VisitedCountries; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public."VisitedCountries" AS
 SELECT row_number() OVER (ORDER BY "CountryName") AS "Id",
    "CountryName"
   FROM ( SELECT DISTINCT p."Country" AS "CountryName"
           FROM (public."Voyages" v
             JOIN public."Ports" p ON ((p."Id" = v."DeparturePortId")))
          WHERE (v."VoyageDate" >= (CURRENT_DATE - '1 year'::interval))
        UNION
         SELECT DISTINCT p."Country" AS "CountryName"
           FROM (public."Voyages" v
             JOIN public."Ports" p ON ((p."Id" = v."ArrivalPortId")))
          WHERE (v."VoyageDate" >= (CURRENT_DATE - '1 year'::interval))) countries;


ALTER VIEW public."VisitedCountries" OWNER TO postgres;

--
-- Name: Voyages_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Voyages_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Voyages_Id_seq" OWNER TO postgres;

--
-- Name: Voyages_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Voyages_Id_seq" OWNED BY public."Voyages"."Id";


--
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgres;

--
-- Name: Ports Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ports" ALTER COLUMN "Id" SET DEFAULT nextval('public."Ports_Id_seq"'::regclass);


--
-- Name: Ships Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ships" ALTER COLUMN "Id" SET DEFAULT nextval('public."Ships_Id_seq"'::regclass);


--
-- Name: Voyages Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Voyages" ALTER COLUMN "Id" SET DEFAULT nextval('public."Voyages_Id_seq"'::regclass);


--
-- Data for Name: Ports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ports" ("Id", "Name", "Country") FROM stdin;
1	New York	USA
2	London	UK
3	Sydney	Australia
4	Tokyo	Japan
5	Barcelona	Spain
6	Cape Town	South Africa
7	Rio De Janeiro	Brazil
8	Vancouver	Canada
9	Dubai	UAE
10	Singapore	Singapore
\.


--
-- Data for Name: Ships; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ships" ("Id", "Name", "MaxSpeed") FROM stdin;
1	Titanic	25
2	Queen Mary 2	30
3	Oasis Of The Seas	22
4	Norwegian Epic	20
5	Symphony Of The Seas	23
6	Liberty Voyager	24
7	Arctic Breeze	21
8	Pacific Star	26
9	Emerald Queen	19
10	Atlantic Dream	27
\.


--
-- Data for Name: Voyages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Voyages" ("Id", "VoyageDate", "DeparturePortId", "ArrivalPortId", "VoyageStart", "VoyageEnd") FROM stdin;
1	2022-03-12	1	2	2022-03-12 09:00:00+02	2022-03-13 14:00:00+02
2	2022-08-20	2	3	2022-08-20 10:00:00+03	2022-08-21 18:00:00+03
3	2023-01-15	3	4	2023-01-15 08:00:00+02	2023-01-16 16:00:00+02
4	2023-05-05	4	5	2023-05-05 07:00:00+03	2023-05-06 13:00:00+03
5	2023-11-25	5	6	2023-11-25 12:00:00+02	2023-11-26 20:00:00+02
6	2024-04-18	6	7	2024-04-18 06:00:00+03	2024-04-19 14:00:00+03
7	2024-09-10	7	8	2024-09-10 15:00:00+03	2024-09-11 22:00:00+03
8	2025-01-05	8	9	2025-01-05 08:00:00+02	2025-01-06 19:00:00+02
9	2025-03-22	9	10	2025-03-22 10:00:00+02	2025-03-23 18:00:00+02
10	2025-07-30	10	1	2025-07-30 07:00:00+03	2025-07-31 16:00:00+03
\.


--
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20250430102907_FixedVoyageRelations	9.0.4
\.


--
-- Name: Ports_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ports_Id_seq"', 1, false);


--
-- Name: Ships_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ships_Id_seq"', 1, false);


--
-- Name: Voyages_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Voyages_Id_seq"', 1, false);


--
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- Name: Ports Ports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ports"
    ADD CONSTRAINT "Ports_pkey" PRIMARY KEY ("Id");


--
-- Name: Ships Ships_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ships"
    ADD CONSTRAINT "Ships_pkey" PRIMARY KEY ("Id");


--
-- Name: Voyages Voyages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Voyages"
    ADD CONSTRAINT "Voyages_pkey" PRIMARY KEY ("Id");


--
-- Name: Voyages FK_ArrivalPort; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Voyages"
    ADD CONSTRAINT "FK_ArrivalPort" FOREIGN KEY ("ArrivalPortId") REFERENCES public."Ports"("Id") ON DELETE CASCADE;


--
-- Name: Voyages FK_DeparturePort; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Voyages"
    ADD CONSTRAINT "FK_DeparturePort" FOREIGN KEY ("DeparturePortId") REFERENCES public."Ports"("Id") ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

