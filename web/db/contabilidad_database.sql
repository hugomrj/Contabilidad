--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.4
-- Dumped by pg_dump version 9.5.4

-- Started on 2018-03-09 17:27:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 7 (class 2615 OID 96787)
-- Name: administracion; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA administracion;


ALTER SCHEMA administracion OWNER TO postgres;

--
-- TOC entry 8 (class 2615 OID 96788)
-- Name: aplicacion; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA aplicacion;


ALTER SCHEMA aplicacion OWNER TO postgres;

--
-- TOC entry 1 (class 3079 OID 12355)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2297 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- TOC entry 210 (class 1255 OID 96789)
-- Name: fn_tai_actualizar_numero_factura(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION fn_tai_actualizar_numero_factura() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

  UPDATE 
    public.ventas  
  SET 
    numero_factura = NEW.venta
  WHERE 
    venta = NEW.venta  ;


	return NEW;

END;
$$;


ALTER FUNCTION public.fn_tai_actualizar_numero_factura() OWNER TO postgres;

--
-- TOC entry 211 (class 1255 OID 96790)
-- Name: fn_tai_proveedor_productos_porcentaje(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION fn_tai_proveedor_productos_porcentaje() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

UPDATE  proveedor_productos
   SET porcentaje_venta = ((precio_venta - precio_compra) * 100) / (precio_venta)
where id = new.id  ;

	return NEW;

END;
$$;


ALTER FUNCTION public.fn_tai_proveedor_productos_porcentaje() OWNER TO postgres;

--
-- TOC entry 212 (class 1255 OID 96791)
-- Name: fn_tbi_actualizar_stock_producto(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION fn_tbi_actualizar_stock_producto() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

  UPDATE 
    public.productos  
  SET 
    existencia = existencia + new.cantidad   
  WHERE 
    producto = new.producto  ;


	return new;
END;
$$;


ALTER FUNCTION public.fn_tbi_actualizar_stock_producto() OWNER TO postgres;

SET search_path = administracion, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 183 (class 1259 OID 96792)
-- Name: interacciones; Type: TABLE; Schema: administracion; Owner: postgres
--

CREATE TABLE interacciones (
    interaccion integer NOT NULL,
    nombre_interaccion character varying(200),
    modulo integer,
    orden integer DEFAULT 0,
    url character varying(200)
);


ALTER TABLE interacciones OWNER TO postgres;

--
-- TOC entry 184 (class 1259 OID 96796)
-- Name: interacciones_interaccion_seq; Type: SEQUENCE; Schema: administracion; Owner: postgres
--

CREATE SEQUENCE interacciones_interaccion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE interacciones_interaccion_seq OWNER TO postgres;

--
-- TOC entry 2298 (class 0 OID 0)
-- Dependencies: 184
-- Name: interacciones_interaccion_seq; Type: SEQUENCE OWNED BY; Schema: administracion; Owner: postgres
--

ALTER SEQUENCE interacciones_interaccion_seq OWNED BY interacciones.interaccion;


--
-- TOC entry 185 (class 1259 OID 96798)
-- Name: interacciones_x_recursos; Type: TABLE; Schema: administracion; Owner: postgres
--

CREATE TABLE interacciones_x_recursos (
    id integer NOT NULL,
    recurso integer NOT NULL,
    interaccion integer NOT NULL
);


ALTER TABLE interacciones_x_recursos OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 96801)
-- Name: modulos; Type: TABLE; Schema: administracion; Owner: postgres
--

CREATE TABLE modulos (
    modulo integer NOT NULL,
    descripcion character varying
);


ALTER TABLE modulos OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 96807)
-- Name: recursos; Type: TABLE; Schema: administracion; Owner: postgres
--

CREATE TABLE recursos (
    recurso integer NOT NULL,
    url character varying
);


ALTER TABLE recursos OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 96813)
-- Name: recursos_recurso_seq; Type: SEQUENCE; Schema: administracion; Owner: postgres
--

CREATE SEQUENCE recursos_recurso_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE recursos_recurso_seq OWNER TO postgres;

--
-- TOC entry 2299 (class 0 OID 0)
-- Dependencies: 188
-- Name: recursos_recurso_seq; Type: SEQUENCE OWNED BY; Schema: administracion; Owner: postgres
--

ALTER SEQUENCE recursos_recurso_seq OWNED BY recursos.recurso;


--
-- TOC entry 189 (class 1259 OID 96815)
-- Name: recursos_x_roles_id_seq; Type: SEQUENCE; Schema: administracion; Owner: postgres
--

CREATE SEQUENCE recursos_x_roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE recursos_x_roles_id_seq OWNER TO postgres;

--
-- TOC entry 2300 (class 0 OID 0)
-- Dependencies: 189
-- Name: recursos_x_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: administracion; Owner: postgres
--

ALTER SEQUENCE recursos_x_roles_id_seq OWNED BY interacciones_x_recursos.id;


--
-- TOC entry 190 (class 1259 OID 96817)
-- Name: roles; Type: TABLE; Schema: administracion; Owner: postgres
--

CREATE TABLE roles (
    rol integer NOT NULL,
    nombre_rol character varying(140)
);


ALTER TABLE roles OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 96820)
-- Name: roles_rol_seq; Type: SEQUENCE; Schema: administracion; Owner: postgres
--

CREATE SEQUENCE roles_rol_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE roles_rol_seq OWNER TO postgres;

--
-- TOC entry 2301 (class 0 OID 0)
-- Dependencies: 191
-- Name: roles_rol_seq; Type: SEQUENCE OWNED BY; Schema: administracion; Owner: postgres
--

ALTER SEQUENCE roles_rol_seq OWNED BY roles.rol;


--
-- TOC entry 192 (class 1259 OID 96822)
-- Name: roles_x_interacciones; Type: TABLE; Schema: administracion; Owner: postgres
--

CREATE TABLE roles_x_interacciones (
    id integer NOT NULL,
    rol integer,
    interaccion integer
);


ALTER TABLE roles_x_interacciones OWNER TO postgres;

--
-- TOC entry 193 (class 1259 OID 96825)
-- Name: roles_x_interacciones_id_seq; Type: SEQUENCE; Schema: administracion; Owner: postgres
--

CREATE SEQUENCE roles_x_interacciones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE roles_x_interacciones_id_seq OWNER TO postgres;

--
-- TOC entry 2302 (class 0 OID 0)
-- Dependencies: 193
-- Name: roles_x_interacciones_id_seq; Type: SEQUENCE OWNED BY; Schema: administracion; Owner: postgres
--

ALTER SEQUENCE roles_x_interacciones_id_seq OWNED BY roles_x_interacciones.id;


--
-- TOC entry 194 (class 1259 OID 96827)
-- Name: usuarios; Type: TABLE; Schema: administracion; Owner: postgres
--

CREATE TABLE usuarios (
    usuario integer NOT NULL,
    cuenta character varying(100),
    clave character varying(150)
);


ALTER TABLE usuarios OWNER TO postgres;

--
-- TOC entry 195 (class 1259 OID 96830)
-- Name: usuarios_usuario_seq; Type: SEQUENCE; Schema: administracion; Owner: postgres
--

CREATE SEQUENCE usuarios_usuario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE usuarios_usuario_seq OWNER TO postgres;

--
-- TOC entry 2303 (class 0 OID 0)
-- Dependencies: 195
-- Name: usuarios_usuario_seq; Type: SEQUENCE OWNED BY; Schema: administracion; Owner: postgres
--

ALTER SEQUENCE usuarios_usuario_seq OWNED BY usuarios.usuario;


--
-- TOC entry 196 (class 1259 OID 96832)
-- Name: usuarios_x_roles; Type: TABLE; Schema: administracion; Owner: postgres
--

CREATE TABLE usuarios_x_roles (
    id integer NOT NULL,
    usuario integer,
    rol integer
);


ALTER TABLE usuarios_x_roles OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 96835)
-- Name: usuarios_x_roles_id_seq; Type: SEQUENCE; Schema: administracion; Owner: postgres
--

CREATE SEQUENCE usuarios_x_roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE usuarios_x_roles_id_seq OWNER TO postgres;

--
-- TOC entry 2304 (class 0 OID 0)
-- Dependencies: 197
-- Name: usuarios_x_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: administracion; Owner: postgres
--

ALTER SEQUENCE usuarios_x_roles_id_seq OWNED BY usuarios_x_roles.id;


SET search_path = aplicacion, pg_catalog;

--
-- TOC entry 198 (class 1259 OID 96837)
-- Name: clientes; Type: TABLE; Schema: aplicacion; Owner: postgres
--

CREATE TABLE clientes (
    cliente integer NOT NULL,
    ruc character varying,
    cliente_tipo character(1),
    cedula integer,
    nombre character varying,
    apellido character varying,
    razon_social character varying,
    direccion character varying,
    telefono character varying,
    email character varying,
    contador integer
);


ALTER TABLE clientes OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 96843)
-- Name: clientes_cliente_seq; Type: SEQUENCE; Schema: aplicacion; Owner: postgres
--

CREATE SEQUENCE clientes_cliente_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE clientes_cliente_seq OWNER TO postgres;

--
-- TOC entry 2305 (class 0 OID 0)
-- Dependencies: 199
-- Name: clientes_cliente_seq; Type: SEQUENCE OWNED BY; Schema: aplicacion; Owner: postgres
--

ALTER SEQUENCE clientes_cliente_seq OWNED BY clientes.cliente;


--
-- TOC entry 201 (class 1259 OID 96961)
-- Name: contadores; Type: TABLE; Schema: aplicacion; Owner: postgres
--

CREATE TABLE contadores (
    contador integer NOT NULL,
    nombre character varying,
    apellido character varying,
    usuario integer,
    cedula integer
);


ALTER TABLE contadores OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 96959)
-- Name: contadores_contador_seq; Type: SEQUENCE; Schema: aplicacion; Owner: postgres
--

CREATE SEQUENCE contadores_contador_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE contadores_contador_seq OWNER TO postgres;

--
-- TOC entry 2306 (class 0 OID 0)
-- Dependencies: 200
-- Name: contadores_contador_seq; Type: SEQUENCE OWNED BY; Schema: aplicacion; Owner: postgres
--

ALTER SEQUENCE contadores_contador_seq OWNED BY contadores.contador;


--
-- TOC entry 207 (class 1259 OID 97042)
-- Name: factura_compras; Type: TABLE; Schema: aplicacion; Owner: postgres
--

CREATE TABLE factura_compras (
    factura integer NOT NULL,
    numero_factura bigint,
    fecha_factura date DEFAULT now(),
    emisor_descripcion character varying(100),
    cliente integer,
    gravada0 bigint DEFAULT 0,
    gravada5 bigint DEFAULT 0,
    gravada10 bigint DEFAULT 0,
    iva5 bigint DEFAULT 0,
    iva10 bigint DEFAULT 0,
    monto_total bigint DEFAULT 0,
    usuario integer,
    forma_pago character varying(2),
    total_iva bigint DEFAULT 0,
    contador integer
);


ALTER TABLE factura_compras OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 97056)
-- Name: factura_compras_detalle; Type: TABLE; Schema: aplicacion; Owner: postgres
--

CREATE TABLE factura_compras_detalle (
    compra_detalle integer NOT NULL,
    factura bigint DEFAULT 0,
    descripcion character varying(200),
    cantidad numeric(10,2) DEFAULT 0,
    precio_unitario bigint DEFAULT 0,
    sub_total bigint DEFAULT 0,
    impuesto0 bigint DEFAULT 0,
    impuesto5 bigint DEFAULT 0,
    impuesto10 bigint DEFAULT 0
);


ALTER TABLE factura_compras_detalle OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 97054)
-- Name: factura_compras_detalle_factura_detalle_seq; Type: SEQUENCE; Schema: aplicacion; Owner: postgres
--

CREATE SEQUENCE factura_compras_detalle_factura_detalle_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE factura_compras_detalle_factura_detalle_seq OWNER TO postgres;

--
-- TOC entry 2307 (class 0 OID 0)
-- Dependencies: 208
-- Name: factura_compras_detalle_factura_detalle_seq; Type: SEQUENCE OWNED BY; Schema: aplicacion; Owner: postgres
--

ALTER SEQUENCE factura_compras_detalle_factura_detalle_seq OWNED BY factura_compras_detalle.compra_detalle;


--
-- TOC entry 206 (class 1259 OID 97040)
-- Name: factura_compras_factura_seq; Type: SEQUENCE; Schema: aplicacion; Owner: postgres
--

CREATE SEQUENCE factura_compras_factura_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE factura_compras_factura_seq OWNER TO postgres;

--
-- TOC entry 2308 (class 0 OID 0)
-- Dependencies: 206
-- Name: factura_compras_factura_seq; Type: SEQUENCE OWNED BY; Schema: aplicacion; Owner: postgres
--

ALTER SEQUENCE factura_compras_factura_seq OWNED BY factura_compras.factura;


--
-- TOC entry 203 (class 1259 OID 96999)
-- Name: factura_ventas; Type: TABLE; Schema: aplicacion; Owner: postgres
--

CREATE TABLE factura_ventas (
    factura integer NOT NULL,
    numero_factura bigint,
    fecha_factura date DEFAULT now(),
    cliente integer,
    gravada0 bigint DEFAULT 0,
    gravada5 bigint DEFAULT 0,
    gravada10 bigint DEFAULT 0,
    iva5 bigint DEFAULT 0,
    iva10 bigint DEFAULT 0,
    monto_total bigint DEFAULT 0,
    usuario integer,
    forma_pago character varying(2),
    orden_trabajo integer,
    total_iva bigint DEFAULT 0
);


ALTER TABLE factura_ventas OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 97015)
-- Name: factura_ventas_detalle; Type: TABLE; Schema: aplicacion; Owner: postgres
--

CREATE TABLE factura_ventas_detalle (
    factura_detalle integer NOT NULL,
    factura bigint DEFAULT 0,
    descripcion character varying(200),
    cantidad integer DEFAULT 0,
    precio_unitario bigint DEFAULT 0,
    sub_total bigint DEFAULT 0,
    porcentaje0 bigint DEFAULT 0,
    porcentaje5 bigint DEFAULT 0,
    porcentaje10 bigint DEFAULT 0,
    impuesto bigint DEFAULT 0,
    cantidad_hoja integer DEFAULT 0
);


ALTER TABLE factura_ventas_detalle OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 97013)
-- Name: factura_ventas_detalle_factura_detalle_seq; Type: SEQUENCE; Schema: aplicacion; Owner: postgres
--

CREATE SEQUENCE factura_ventas_detalle_factura_detalle_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE factura_ventas_detalle_factura_detalle_seq OWNER TO postgres;

--
-- TOC entry 2309 (class 0 OID 0)
-- Dependencies: 204
-- Name: factura_ventas_detalle_factura_detalle_seq; Type: SEQUENCE OWNED BY; Schema: aplicacion; Owner: postgres
--

ALTER SEQUENCE factura_ventas_detalle_factura_detalle_seq OWNED BY factura_ventas_detalle.factura_detalle;


--
-- TOC entry 202 (class 1259 OID 96997)
-- Name: factura_ventas_factura_seq; Type: SEQUENCE; Schema: aplicacion; Owner: postgres
--

CREATE SEQUENCE factura_ventas_factura_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE factura_ventas_factura_seq OWNER TO postgres;

--
-- TOC entry 2310 (class 0 OID 0)
-- Dependencies: 202
-- Name: factura_ventas_factura_seq; Type: SEQUENCE OWNED BY; Schema: aplicacion; Owner: postgres
--

ALTER SEQUENCE factura_ventas_factura_seq OWNED BY factura_ventas.factura;


SET search_path = administracion, pg_catalog;

--
-- TOC entry 2067 (class 2604 OID 96904)
-- Name: interaccion; Type: DEFAULT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY interacciones ALTER COLUMN interaccion SET DEFAULT nextval('interacciones_interaccion_seq'::regclass);


--
-- TOC entry 2068 (class 2604 OID 96905)
-- Name: id; Type: DEFAULT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY interacciones_x_recursos ALTER COLUMN id SET DEFAULT nextval('recursos_x_roles_id_seq'::regclass);


--
-- TOC entry 2069 (class 2604 OID 96906)
-- Name: recurso; Type: DEFAULT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY recursos ALTER COLUMN recurso SET DEFAULT nextval('recursos_recurso_seq'::regclass);


--
-- TOC entry 2070 (class 2604 OID 96907)
-- Name: rol; Type: DEFAULT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY roles ALTER COLUMN rol SET DEFAULT nextval('roles_rol_seq'::regclass);


--
-- TOC entry 2071 (class 2604 OID 96908)
-- Name: id; Type: DEFAULT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY roles_x_interacciones ALTER COLUMN id SET DEFAULT nextval('roles_x_interacciones_id_seq'::regclass);


--
-- TOC entry 2072 (class 2604 OID 96909)
-- Name: usuario; Type: DEFAULT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY usuarios ALTER COLUMN usuario SET DEFAULT nextval('usuarios_usuario_seq'::regclass);


--
-- TOC entry 2073 (class 2604 OID 96910)
-- Name: id; Type: DEFAULT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY usuarios_x_roles ALTER COLUMN id SET DEFAULT nextval('usuarios_x_roles_id_seq'::regclass);


SET search_path = aplicacion, pg_catalog;

--
-- TOC entry 2074 (class 2604 OID 96911)
-- Name: cliente; Type: DEFAULT; Schema: aplicacion; Owner: postgres
--

ALTER TABLE ONLY clientes ALTER COLUMN cliente SET DEFAULT nextval('clientes_cliente_seq'::regclass);


--
-- TOC entry 2075 (class 2604 OID 96964)
-- Name: contador; Type: DEFAULT; Schema: aplicacion; Owner: postgres
--

ALTER TABLE ONLY contadores ALTER COLUMN contador SET DEFAULT nextval('contadores_contador_seq'::regclass);


--
-- TOC entry 2095 (class 2604 OID 97045)
-- Name: factura; Type: DEFAULT; Schema: aplicacion; Owner: postgres
--

ALTER TABLE ONLY factura_compras ALTER COLUMN factura SET DEFAULT nextval('factura_compras_factura_seq'::regclass);


--
-- TOC entry 2104 (class 2604 OID 97059)
-- Name: compra_detalle; Type: DEFAULT; Schema: aplicacion; Owner: postgres
--

ALTER TABLE ONLY factura_compras_detalle ALTER COLUMN compra_detalle SET DEFAULT nextval('factura_compras_detalle_factura_detalle_seq'::regclass);


--
-- TOC entry 2076 (class 2604 OID 97002)
-- Name: factura; Type: DEFAULT; Schema: aplicacion; Owner: postgres
--

ALTER TABLE ONLY factura_ventas ALTER COLUMN factura SET DEFAULT nextval('factura_ventas_factura_seq'::regclass);


--
-- TOC entry 2085 (class 2604 OID 97018)
-- Name: factura_detalle; Type: DEFAULT; Schema: aplicacion; Owner: postgres
--

ALTER TABLE ONLY factura_ventas_detalle ALTER COLUMN factura_detalle SET DEFAULT nextval('factura_ventas_detalle_factura_detalle_seq'::regclass);


--
-- TOC entry 2288 (class 2613 OID 33442)
-- Name: 33442; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('33442');


ALTER LARGE OBJECT 33442 OWNER TO postgres;

SET search_path = administracion, pg_catalog;

--
-- TOC entry 2261 (class 0 OID 96792)
-- Dependencies: 183
-- Data for Name: interacciones; Type: TABLE DATA; Schema: administracion; Owner: postgres
--

COPY interacciones (interaccion, nombre_interaccion, modulo, orden, url) FROM stdin;
1	Usuarios	10	1	/Sistema/Usuario/Lista.jspx
2	Roles	10	2	/Sistema/Rol/Lista.jspx
3	Interacciones	10	3	/Sistema/Interaccion/Lista.jspx
4	Recursos	10	4	/Sistema/Recurso/Lista.jspx
18	Contadores	30	0	/Aplicacion/Contador/Lista.jspx
19	Clientes	40	0	/Session/Cliente/Lista.jspx
20	Facturas Compras	40	0	/Session/FacturaCompra/Lista.jspx
\.


--
-- TOC entry 2311 (class 0 OID 0)
-- Dependencies: 184
-- Name: interacciones_interaccion_seq; Type: SEQUENCE SET; Schema: administracion; Owner: postgres
--

SELECT pg_catalog.setval('interacciones_interaccion_seq', 20, true);


--
-- TOC entry 2263 (class 0 OID 96798)
-- Dependencies: 185
-- Data for Name: interacciones_x_recursos; Type: TABLE DATA; Schema: administracion; Owner: postgres
--

COPY interacciones_x_recursos (id, recurso, interaccion) FROM stdin;
4	9	1
6	11	1
7	12	1
8	13	1
9	14	2
10	15	2
11	16	2
12	17	2
13	18	2
16	20	3
17	21	3
18	22	3
19	23	3
20	24	3
21	25	4
22	26	4
23	27	4
24	28	4
25	29	4
47	10	1
48	50	4
51	55	3
52	56	2
53	57	18
54	58	18
55	59	18
56	60	18
57	61	18
58	62	18
59	63	18
60	64	18
61	65	18
62	66	18
63	67	19
64	68	19
65	69	19
66	70	19
67	71	19
68	72	19
69	74	19
70	76	19
71	77	19
72	78	19
73	79	20
75	81	20
76	82	20
77	83	20
78	84	20
79	85	20
80	86	20
81	87	20
\.


--
-- TOC entry 2264 (class 0 OID 96801)
-- Dependencies: 186
-- Data for Name: modulos; Type: TABLE DATA; Schema: administracion; Owner: postgres
--

COPY modulos (modulo, descripcion) FROM stdin;
10	Acceso
20	Comercial
30	Administracion
40	Contabilidad
\.


--
-- TOC entry 2265 (class 0 OID 96807)
-- Dependencies: 187
-- Data for Name: recursos; Type: TABLE DATA; Schema: administracion; Owner: postgres
--

COPY recursos (recurso, url) FROM stdin;
9	/Sistema/Usuario/Lista.jspx
10	/Sistema/Usuario/Agregar.jspx
11	/Sistema/Usuario/Borrar.jspx
12	/Sistema/Usuario/Editar.jspx
13	/Sistema/Usuario/Registro.jspx
14	/Sistema/Rol/Agregar.jspx
15	/Sistema/Rol/Borrar.jspx
16	/Sistema/Rol/Editar.jspx
17	/Sistema/Rol/Lista.jspx
18	/Sistema/Rol/Registro.jspx
19	/Aplicacion/Cliente/Lista.jspx
20	/Sistema/Interaccion/Agregar.jspx
21	/Sistema/Interaccion/Borrar.jspx
22	/Sistema/Interaccion/Editar.jspx
23	/Sistema/Interaccion/Lista.jspx
24	/Sistema/Interaccion/Registro.jspx
25	/Sistema/Recurso/Agregar.jspx
26	/Sistema/Recurso/Borrar.jspx
27	/Sistema/Recurso/Editar.jspx
28	/Sistema/Recurso/Lista.jspx
29	/Sistema/Recurso/Registro.jspx
30	/Aplicacion/Cliente/Agregar.jspx
31	/Aplicacion/Cliente/Borrar.jspx
32	/Aplicacion/Cliente/Editar.jspx
34	/Aplicacion/Cliente/Registro.jspx
35	/Aplicacion/Funcionario/Agregar.jspx
36	/Aplicacion/Funcionario/Borrar.jspx
37	/Aplicacion/Funcionario/Lista.jspx
38	/Aplicacion/Funcionario/Registro.jspx
39	/Aplicacion/Funcionario/Editar.jspx
40	/Aplicacion/Gestion/Lista.jspx
41	/Aplicacion/Gestion/Borrar.jspx
42	/Aplicacion/Gestion/Editar.jspx
43	/Aplicacion/Gestion/Registro.jspx
44	/Aplicacion/Gestion/Agregar.jspx
45	/Aplicacion/Labor/Agregar.jspx
46	/Aplicacion/Labor/Borrar.jspx
47	/Aplicacion/Labor/Editar.jspx
48	/Aplicacion/Labor/Lista.jspx
49	/Aplicacion/Labor/Registro.jspx
50	/Recurso/Linea.json
53	/Labor/Linea.json
54	/Labor/Coleccion/Lista
55	/RolInteraccion/Linea.json
56	/Rol/Linea.json
57	/Aplicacion/Contador/Lista.jspx
58	/Contador/Coleccion/Lista
59	/Aplicacion/Contador/Agregar.jspx
60	/Contador/Linea.json
61	/Contador/Controlador/Agregar
62	/Aplicacion/Contador/Registro.jspx
63	/Aplicacion/Contador/Editar.jspx
64	/Contador/Controlador/Editar
65	/Contador/Controlador/Borrar
66	/Aplicacion/Contador/Borrar.jspx
67	/Session/Cliente/Lista.jspx
68	/Cliente/Coleccion/Lista
69	/Session/Cliente/Agregar.jspx
70	/Cliente/Controlador/Agregar
71	/Session/Cliente/Registro.jspx
72	/Cliente/Linea.json
74	/Session/Cliente/Editar.jspx
76	/Session/Cliente/Borrar.jspx
77	/Cliente/Controlador/Editar
78	/Cliente/Controlador/Borrar
79	/Session/FacturaCompra/Lista.jspx
80	/FacturaVenta/Coleccion/Lista
81	/FacturaCompra/Coleccion/Lista
82	/Session/FacturaCompra/Nuevo.jspx
83	/FacturaCompraDetalle/Coleccion/Lista
84	/FacturaCompraDetalle/Transaccion/Lista
85	/FacturaCompraDetalle/Transaccion/Agregar
86	/FacturaCompra/Transaccion/Fin
87	/FacturaCompraDetalle/Transaccion/Pie.json
\.


--
-- TOC entry 2312 (class 0 OID 0)
-- Dependencies: 188
-- Name: recursos_recurso_seq; Type: SEQUENCE SET; Schema: administracion; Owner: postgres
--

SELECT pg_catalog.setval('recursos_recurso_seq', 87, true);


--
-- TOC entry 2313 (class 0 OID 0)
-- Dependencies: 189
-- Name: recursos_x_roles_id_seq; Type: SEQUENCE SET; Schema: administracion; Owner: postgres
--

SELECT pg_catalog.setval('recursos_x_roles_id_seq', 81, true);


--
-- TOC entry 2268 (class 0 OID 96817)
-- Dependencies: 190
-- Data for Name: roles; Type: TABLE DATA; Schema: administracion; Owner: postgres
--

COPY roles (rol, nombre_rol) FROM stdin;
1	admistrador
2	Supervisor
7	contador
\.


--
-- TOC entry 2314 (class 0 OID 0)
-- Dependencies: 191
-- Name: roles_rol_seq; Type: SEQUENCE SET; Schema: administracion; Owner: postgres
--

SELECT pg_catalog.setval('roles_rol_seq', 7, true);


--
-- TOC entry 2270 (class 0 OID 96822)
-- Dependencies: 192
-- Data for Name: roles_x_interacciones; Type: TABLE DATA; Schema: administracion; Owner: postgres
--

COPY roles_x_interacciones (id, rol, interaccion) FROM stdin;
1	1	1
3	1	3
4	1	4
6	1	6
9	2	6
24	5	1
31	2	8
33	1	8
35	1	2
40	1	13
47	1	18
48	7	19
49	7	20
\.


--
-- TOC entry 2315 (class 0 OID 0)
-- Dependencies: 193
-- Name: roles_x_interacciones_id_seq; Type: SEQUENCE SET; Schema: administracion; Owner: postgres
--

SELECT pg_catalog.setval('roles_x_interacciones_id_seq', 49, true);


--
-- TOC entry 2272 (class 0 OID 96827)
-- Dependencies: 194
-- Data for Name: usuarios; Type: TABLE DATA; Schema: administracion; Owner: postgres
--

COPY usuarios (usuario, cuenta, clave) FROM stdin;
1	admin	d41d8cd98f00b204e9800998ecf8427e
2	gerente	d41d8cd98f00b204e9800998ecf8427e
6	sonia	d41d8cd98f00b204e9800998ecf8427e
8	hugo	d41d8cd98f00b204e9800998ecf8427e
9	ada	d41d8cd98f00b204e9800998ecf8427e
\.


--
-- TOC entry 2316 (class 0 OID 0)
-- Dependencies: 195
-- Name: usuarios_usuario_seq; Type: SEQUENCE SET; Schema: administracion; Owner: postgres
--

SELECT pg_catalog.setval('usuarios_usuario_seq', 9, true);


--
-- TOC entry 2274 (class 0 OID 96832)
-- Dependencies: 196
-- Data for Name: usuarios_x_roles; Type: TABLE DATA; Schema: administracion; Owner: postgres
--

COPY usuarios_x_roles (id, usuario, rol) FROM stdin;
1	1	1
16	6	5
20	6	2
21	8	7
22	9	7
\.


--
-- TOC entry 2317 (class 0 OID 0)
-- Dependencies: 197
-- Name: usuarios_x_roles_id_seq; Type: SEQUENCE SET; Schema: administracion; Owner: postgres
--

SELECT pg_catalog.setval('usuarios_x_roles_id_seq', 22, true);


SET search_path = aplicacion, pg_catalog;

--
-- TOC entry 2276 (class 0 OID 96837)
-- Dependencies: 198
-- Data for Name: clientes; Type: TABLE DATA; Schema: aplicacion; Owner: postgres
--

COPY clientes (cliente, ruc, cliente_tipo, cedula, nombre, apellido, razon_social, direccion, telefono, email, contador) FROM stdin;
10	12345	J	0			Empresa A				2
9	854654	J	0			Empresa B				2
6	456855	J	0			Empresa A				3
11		F	123	pepito	perez					2
7	454545	F	12345	nombre cliente 1 editado	editado EDI					3
13		J	0			una empresa AA				\N
14	sdag	F	454							\N
15		J	0			razon 1				3
\.


--
-- TOC entry 2318 (class 0 OID 0)
-- Dependencies: 199
-- Name: clientes_cliente_seq; Type: SEQUENCE SET; Schema: aplicacion; Owner: postgres
--

SELECT pg_catalog.setval('clientes_cliente_seq', 15, true);


--
-- TOC entry 2279 (class 0 OID 96961)
-- Dependencies: 201
-- Data for Name: contadores; Type: TABLE DATA; Schema: aplicacion; Owner: postgres
--

COPY contadores (contador, nombre, apellido, usuario, cedula) FROM stdin;
2	hugo 	romero	8	3437941
3	Ada		9	45644
\.


--
-- TOC entry 2319 (class 0 OID 0)
-- Dependencies: 200
-- Name: contadores_contador_seq; Type: SEQUENCE SET; Schema: aplicacion; Owner: postgres
--

SELECT pg_catalog.setval('contadores_contador_seq', 3, true);


--
-- TOC entry 2285 (class 0 OID 97042)
-- Dependencies: 207
-- Data for Name: factura_compras; Type: TABLE DATA; Schema: aplicacion; Owner: postgres
--

COPY factura_compras (factura, numero_factura, fecha_factura, emisor_descripcion, cliente, gravada0, gravada5, gravada10, iva5, iva10, monto_total, usuario, forma_pago, total_iva, contador) FROM stdin;
10	44545	2018-03-09	fasdasdfasf	10	\N	\N	\N	\N	\N	\N	8	\N	\N	2
11	0	\N		10	\N	\N	\N	\N	\N	\N	8	CO	\N	2
12	0	\N		11	\N	\N	\N	\N	\N	\N	8	CO	\N	2
13	0	\N		11	\N	\N	\N	\N	\N	\N	8	CO	\N	2
14	0	\N		11	\N	\N	\N	\N	\N	\N	8	CR	\N	2
15	0	\N		9	\N	\N	\N	\N	\N	\N	8	CO	\N	2
\.


--
-- TOC entry 2287 (class 0 OID 97056)
-- Dependencies: 209
-- Data for Name: factura_compras_detalle; Type: TABLE DATA; Schema: aplicacion; Owner: postgres
--

COPY factura_compras_detalle (compra_detalle, factura, descripcion, cantidad, precio_unitario, sub_total, impuesto0, impuesto5, impuesto10) FROM stdin;
1	13	6	5.00	8	40	0	0	40
2	14	8	8.00	9	72	0	0	72
3	15	5	5.00	5	25	0	0	25
\.


--
-- TOC entry 2320 (class 0 OID 0)
-- Dependencies: 208
-- Name: factura_compras_detalle_factura_detalle_seq; Type: SEQUENCE SET; Schema: aplicacion; Owner: postgres
--

SELECT pg_catalog.setval('factura_compras_detalle_factura_detalle_seq', 3, true);


--
-- TOC entry 2321 (class 0 OID 0)
-- Dependencies: 206
-- Name: factura_compras_factura_seq; Type: SEQUENCE SET; Schema: aplicacion; Owner: postgres
--

SELECT pg_catalog.setval('factura_compras_factura_seq', 15, true);


--
-- TOC entry 2281 (class 0 OID 96999)
-- Dependencies: 203
-- Data for Name: factura_ventas; Type: TABLE DATA; Schema: aplicacion; Owner: postgres
--

COPY factura_ventas (factura, numero_factura, fecha_factura, cliente, gravada0, gravada5, gravada10, iva5, iva10, monto_total, usuario, forma_pago, orden_trabajo, total_iva) FROM stdin;
\.


--
-- TOC entry 2283 (class 0 OID 97015)
-- Dependencies: 205
-- Data for Name: factura_ventas_detalle; Type: TABLE DATA; Schema: aplicacion; Owner: postgres
--

COPY factura_ventas_detalle (factura_detalle, factura, descripcion, cantidad, precio_unitario, sub_total, porcentaje0, porcentaje5, porcentaje10, impuesto, cantidad_hoja) FROM stdin;
\.


--
-- TOC entry 2322 (class 0 OID 0)
-- Dependencies: 204
-- Name: factura_ventas_detalle_factura_detalle_seq; Type: SEQUENCE SET; Schema: aplicacion; Owner: postgres
--

SELECT pg_catalog.setval('factura_ventas_detalle_factura_detalle_seq', 1, false);


--
-- TOC entry 2323 (class 0 OID 0)
-- Dependencies: 202
-- Name: factura_ventas_factura_seq; Type: SEQUENCE SET; Schema: aplicacion; Owner: postgres
--

SELECT pg_catalog.setval('factura_ventas_factura_seq', 1, false);


--
-- TOC entry 2289 (class 0 OID 0)
-- Data for Name: BLOBS; Type: BLOBS; Schema: -; Owner: 
--

SET search_path = pg_catalog;

BEGIN;

SELECT pg_catalog.lo_open('33442', 131072);
SELECT pg_catalog.lowrite(0, '\xffd8ffe000104a46494600010100000100010000fffe003b43524541544f523a2067642d6a7065672076312e3020287573696e6720494a47204a50454720763632292c207175616c697479203d2037350affdb004300080606070605080707070909080a0c140d0c0b0b0c1912130f141d1a1f1e1d1a1c1c20242e2720222c231c1c2837292c30313434341f27393d38323c2e333432ffdb0043010909090c0b0c180d0d1832211c213232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232ffc0001108015d026c03012200021101031101ffc4001f0000010501010101010100000000000000000102030405060708090a0bffc400b5100002010303020403050504040000017d01020300041105122131410613516107227114328191a1082342b1c11552d1f02433627282090a161718191a25262728292a3435363738393a434445464748494a535455565758595a636465666768696a737475767778797a838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae1e2e3e4e5e6e7e8e9eaf1f2f3f4f5f6f7f8f9faffc4001f0100030101010101010101010000000000000102030405060708090a0bffc400b51100020102040403040705040400010277000102031104052131061241510761711322328108144291a1b1c109233352f0156272d10a162434e125f11718191a262728292a35363738393a434445464748494a535455565758595a636465666768696a737475767778797a82838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae2e3e4e5e6e7e8e9eaf2f3f4f5f6f7f8f9faffda000c03010002110311003f00f7fa28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28aad7d79158594b753b61235dc7dfdbf13c50043a96a96fa6421e625a46e238939773e805711e21f151b30dfda774f1337ddd3acd879983ff003d1ff87fcf1547c49e229b484fb4bb29d6aed331af516911e981fde3dbe84fa0af339a479a579657677762cccc72493d493d4d56c2dcdeb9f19ddacc7fb3ed2d2ce2078fdd89643ee59f8cfe02b3a5f167881d8b7f6bdd8cf647d98ffbe40acc357174e47b70c49dc5776ea571d8ad75adeab75febb52bd7ff007ae5cff5acc95e490e6491dffdf62dfcea66a21804c5b2785a41628322f3fbb4cffb83fc2a2718e8073ed8ad116a1a4914bf0a6a8ce9b2465ce706802b124773f9d46ecdfde6fcebb6d03c08dade8c9a91bc655794c4228a2decb81d5b9181569be1a8f2cbfda2ff00819c7d8f93f286fef75e71f5a00f3a677fefb7e75133b73f3b7e66bd1dfe1900e47daef721b6e7ec7fed05cfdee9ce7e9518f8621bfe5eef07ca1b9b3ff658e3ef75f971f523d6803cdcbb7666fcea3666ea18fe75e95ff0abb7093fd36ec6c04ffc7a1e71b4ff007bfdafd0fa571be26d01bc39abbd8b5cc771850c248fb83eb4018a5db1d73f80a55ba9e3ff00572ba7fba714c34d3401760f106b16ac0c3aa5e211d02cec3fad5d1e3af13aff00cc66e9bfdf7ddfceb04d30d176163a88be216b6a36dcb5bdd03c9f3add0ff200d743a278fb4efb446ee93e8f7a481f6ab47253d8b29e71f89fa57999a69a7ccc5647d53a07c419e0f2975a921b8b194e22d52df1b3db781c0faf18f4af478e549a35923757461956539047b1af8c3c2be2bb8f0edd95914dc69f37cb716ccc70e3d47a11d8ff004afa07c0be22874f9ed34d5b8f3f47d454c9613b1ff56fde23f8e78f5fad3df603d468c8f5a2b335ed6ad7c3fa35c6a778c4430ae703ab93d147b9352321f1078934cf0ce9cd79a94e1171f22039790fa28ea6bc675af8afadeb570d1e9adfd9f699f9553990fb96ff000fd6b8ff0012eafaa789b5a9353d418aeecf95113f2c29d947d3b9f5aa11dcc76d91180cff00df61fc87f8fe556925b93ab3aed3ecaef519bce95de4763f34923124fd49aeb6d3c3f631a86bcd5ad20f50f328feb5e472ea324cbb659e571fdd2e40fc8556f3e15fbb0c7f90aa720513d86fb43f044b7114f71e23b68ae22185960b95571ea320d4f6737c3ad37715d5e299d8e5a47919d98fb9c64d78c1be20600007a62986f9fe953763b1eee3c55e0187eeddc6d8f48643fd286f1df8222fbaecdfeedac9fd56bc15af653de986ee5a2ec2c7bc37c4af06a7fcb2b96fa599fea2987e2978457a5ade9ffb75ff00ebd7839ba94f73519b997d4d17607bc9f8abe13ff9f2beff00c061fe349ff0b53c207ad95eff00e030ff001af043712fa9a6fda24f5345d858f7eff859de0c6fbd6f763fedd4ff00434a3e2178165e1bcf4fadabff00857cfdf6893d4d21b997d4d176163e84ff0084bfe1fcc39bed9fef4320fe949fdb7e00987cbacdba7fbdb97f98af9e7ed727bd27db24c7268bb0b1f42799e0eb8ff51e22d3f3fed4c0543369da6480fd9b55b29bda3b853fd6bc07edaf4d3740fde453f853e662e547b0ea5a4327cc841239047ff5aa1b0f1e7893c392aac776d736ea4661b8f9c63d01ea3f3fc2bcaedf56b8b63fb89e58874c2b903f2e95a5078925906cbcfdf8fef9e187f8d3ba61668fa7fc23e3dd27c5b0f970b8b7be51f3daca46ee3ba9ee2badc8f5af90a23716f3c5a9e97705648583c72a1c3291ebe95f447c39f1cc7e33d19cccab16a768425d463a1c8e1d7d8e0fe20d66d5868ed68a28a430a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800ae67c4328b9d4ed6ca538b5851aeee31e8b9c0fd0d74d5c078ba730da788ee51f0fe5456aa7d37633fccd3426794eada8cdab6a7717b3b12f2beec1ec3b0fa0181544d266909a4311a90dc4a2231891b67a5231a8d8d0046d51962bd091f4a7b1a85cd00465d81241209aaefce4f5a998d5fd2b4eb6be8e633348d229188e323763fbdcf5fa50065c57b756c8520b896353ce11c8148dab6a3ff003fd73ff7f4d6ad96896f75673492492ab977484600ced04f23f0a4b4d020bcd36da6f364134cdcaf180bb8293d3de8b018cdab6a3ff3ff00719ffaea6a26d5b511ff002fd73ff7f4d6f36836235b3666693cb36e258d77052e4f604f1fa5516d1adcc97c15a75104b12289170d863839f71eb4580cb6d5b51c7fc7fdcffdfd354a696499cbcaecec7b93935d3ffc2356cefaa46b34be65bc82387a7cec549e78f6a647e1eb5fb6de2c8d712456f1c442c78dcc5f1dc8f7a2c072ad4c357753b55b2d467b74f336a37cbe62ed6c7bd52340119a61e952aa1924544fbcc428e70326ba8b9f07496da0497d27caf1aee2dbbaf3d02e381f8fe14c0e40d30d7432f8736461d6ef3c0ddf26304843ebc8c3f5f6a61f0e2f99e59bbc3ab8ddf27182cc0639e4e53a71d473401cf9af49f86fa83ea3a6dff87d89f36206f6ce4079474ea07b1033ff0001af3dbc805addc90a97210e3e7528df88ed5bbe00befb078e74a97242b4c236c770df291fad0b71347d7be1ed5575ad02cb505eb3460b8f471c30fcc1af2ef8b7ac2de6bb65a1a3e62b54fb4cc83bbb70a0fd0738f715d87c35902e8d7d67ce6daf645c7a03823f99af1cf104bfda7f10b5f90b332b4e5060ff0008047f2534d6e2e8731ab5e3b3ede8bd97d7deb2d77b9ef53ea0de65ebf18f9ba7a559b4b5dc07146ec65411311de9e2d98f5079ad95b4000f97f4a7081738238fa76a76198bf653e87f2a77d9081d3f4ad9300c6768c6476a4f2863eef7f4a0463fd93d01fca9a6d17a9c8fc2b69a303395ea7dea268c64f00e7dcd00647d94771fa1a6fd946381c7d2b54a2e3e5a89d00238ef401986dc67a73f4a67d9c7707f235a450647031f534ddabd06339e7934019a6d87a7e94c6b61d8639f4ad131afe39a468c6390393ea680328db0ce0839ff0074d30db7f9db5a9b01e0018f4a618949e0734580cc36de99fcaa336e4763f956b18c63951fad33c9048e063e94ac063b44c33c1a848653e95b4d6e09e83f2aa9756db7268680b7a1dfc914e1148c370ca7a30f7aedbc1dae37853c7b61788e63b2bc716f72add3631c03f8360fe75e736395bb4c004e4575facdbacda5c72a290597248f51c67ff41fce803eb8078a5acbf0e5e7dbfc33a55d92499ad22727d49519ad4a9185145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400579778d1c8f0ff881b3cff68443f018ff000af5135e53e353ff0014ef887fec251ff314d099e5bba826a3dd48641ea3f3a431c4d309a6971ea2985c7ad3b3ec2ba0635039a733fbd44c68b3ec174318d59b3d524b052ab14527cc1d77839561d0f0455526a16268e57d82e8bffdbb7686223cb3e5cad28e0f2cdd73cfbd450ebd776d1c69108c2c68eabc1fe2393dfd6a83542d9f4a2cfb05d1a3fdbb3fda3ce921864061109465e0a8fc7ad34f88ae8dddc4f2c30c9e76cca3038057ee91cf6fad66367d2a36cf5c1a2cfb05d1a3ff000905f2cb34a0c7be59d6763b7f897a63db9a43e23bbfb5dcdc4914127da428923653b481d3a1c8e9eb59641f4a8d81a2d2ec1744b7d7936a17b2dddc106594e5b68c73d3fa5556a97ca90f223623e951ba3afde461f514598ee88c31470ca4820e41fd6b5f57f14ea3ac5ac36d70e16341f304e3cc6f5358e73e869a41f4a2cc575dcd56f125d9d80c56e55460aed386385193cf5f957b8e955df5db89136cb0c1265b2e5949de32c7079c7058f4c75eb59ec0fa53483e869d9f60ba24bbba7bdba79e40a19b1c2f00600007e4055bf0e1c789f4b3dfed519ffc785671ad0f0eff00c8cba67fd7cc7ffa10a5b319f557c3ef96ff00c4683a0bb5207d41ff000af248a141a9eb770c3f78c5d81fa91fd09af5af00f1aa7897febe53f9357963a6d6d45f1f7947f3ff00eb557524e0655dd7ac339cb1ae82ce10a80e2b04f3a81cf1f357536eb88874e714218a548c74a66cc9f5e6ac15031c9cd1d393d3fa53110f9631d703229acb8edc03eb5336429c74e3bd44c7d49e79a008594755e4fd6a070a79f7f5ab0edd7391df8f5aaee4fa5032224800918155e49028e0f5eb934f60f24d1c302992795824683f8989e2bab8340f07696047ac4b75a8dfed0d28567544cf60a83a7d4e4d26c0e28cc808f9b9cfad37ce56239e7b735dbdccbf0d6dd73fd99317f466b8c7f3ae6f51d47c1b7c4da5869bf64989c24ab2cb9ffc7c90695c66606caf1d3269a48c71ce0fad4735b4f632a453ab61d77c6f8fbcbdcfd78a0b1600f3d69887123b9c53724e73c0fad20273c124fd690679f98e7eb4c00918eb9e3d6901c119ebdb9a43d6907a64e31d73400fc8c827d3d6a39d159090307f2a0b1ce7249c7734a7a60f00fd2901951285bd5c9dbcd770e04ba5408c383b947e5bbff65ae31c15be4c73c8aeca2f9aced803bbe73cff00c05a8407d17e0327fe104d101ea2d117f218fe95d1d60f83176783f4c4feec38fd4d6f540c28a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a000d79378d5bfe29df11fb6a51ff00315eb35e45e366c7877c4beda947fcc53423ca8bf07e95bb046ab6f1803f847f2ae6f7f15d4c4556188377407f415d5855b98d66d5ac3760f4a6941e953164a4de9ef5d76473dd9018c7a0a618c7a5582c94876d3e542e6655283d0546631e82ae1db4d281aa9450b99944c63fba2a3318f415a62d59fa62a54d1ee24e9b7fefaa2d11733309a31e956f471145ab4264b7f3c1257cb0aa77123a73c56aff00c2377afd047ff7d7ff005a9c3c2ba96e0cbe5820f043e31fa527cb6b5c149a655d43ec8f7ba5a258a4002299106d21b2463a75efd79e69fe23b1d3d34f865b681124c024a8c73939ce3b5595f076acec197cac8e87cce9fa5586f01788a75c13132fa197ff00ad4e0e9c63693d44d4dbba3bd6d434fd13c376571742355f26255555196621546075ea47e75e5fe24d526f11e8505e490a2b35de2389147c8a6146da3039e49ad8b9f0f78b624449ee229042a153cc2afb471c0caff9c5635e699ae954596740b19250230400e00c8da07618ae7a749735ee8da551f2dac54bbf0bae9be18b8bbb950d7859001c7eec6ef5f53eb57fc51a1e9d6be17b7b882d91254d8a187707939f5e7d6b2aeac353316d9ae59d1b9da662c3f1154a78ef5d3cb96e24741c8569091fad4623093ab529ce33b28bbbf3464e4449a75abc8ade4398cdb2c8fb4e4a9e7a71ce4e38ed9a4b4d22d24b4f3a5625bce4050150c173cfcbd49a81a1641d71db8a8194039e735dbecee2e732bc456e96d77b50617391c1c80403839ef55fc39ff233699ff5f31ffe842a6d6c7eee26e7258927d78a83c39ff233699ff5f31ffe842bccc4ae5a96476d17785cfaa7c05ff216f128ff00a784fe4d5e6b7aa12cee1bb98d09fc6bd1fc0ceb1eabe286660aab2a3124e00186e6bcdf5120e9f295208314647e46b3ea6879e0e75027ef7cd5d540d8857271c0ae4c1ff4f3fc3f357511b6225e3b7a5245167713ce3eb4c924e7ae707a63bd3370f5e73e95148d91803f1c5324a577a8c914ed1a44bf2e325980e6ab36a739ff009630ff00dfca75ca5c3ce5919f6823685515525b595df7b99377d0669145bb7bc926721d17d7e56dd52bb7ca79c7d0554b68648d8962fb4f7602a77e878cfe14c46cf831126f18d82b007fd63018ee227c541aadcfd9f58d4109f9bcdfc7eeae29fe097dbe33b03c633275ff00ae4f5cd78b751dbe28bf2a7ab83ff8ead43196ef2ca5b88b7170a48e14d71575be2bb2a78746edeb5d4af896c5edb32ee126002319ff00f5d7297b702eaf259c020336403e9480f5cf1e5a25bf877419368f319e65dd8e48c21feb5c4237031fcabd07e23beff0a7879bfe9a4fff00a0c75e728781c7e954226ce7d87d282dfecfe94c1ce38fd29473ff00eaaa00cfcdf87a520e4f4fd28e3278c71e948bf4e31e94008c7b60608f414a0fd4903d05230cfe03d28c73c0fd280294e7fd313b723d2bb3d3be74b6c9c1dfdbfdd6ae2ee3fe3f138cf23b5767a2f2f6d9f986e19fc8d25b8743e94f087fc8a9a7ff00d733ff00a11adbac5f098c785ec7fdd3ff00a11adaa860828a28a061451450014514500145145001451450014514500145145001451450014514500145145001451450014514500145145001451450015e3be373ff0014ef8a3db538ff0098af62af19f1c363c3fe2af6d4e2fe629a11e4dbabae906121ff00ae6bfcab890f5dcccbf241ff005c97f9575e115d339ebbb345db2b6d3f7db7daae5e532b01e45b8c1504e3e662303e83355a78a1b7d4a585d5da18e665201018804f720807df14b6299bfb63ff004d57ff00421562ee079b59b98e352cef70eaaa3b9dc6bad41f36a60e4ac30dd596ff00974a4f2f3fc53b96c7d41033f853af34d2252d691c8d09805c60f26343eb8f42719ab1f66b1b33fbe3f6bb853cc719c463eadd4ffc07f3a82779ae66695f1960000a30157b003b0029a86b7444aa24accab6b652de4c228c73d4b13c2a8ea4fa0abd7b636691e9e6d3cd2b36e5777fe321b1903b0f6ad1b8d27508e15b4b5b19fc9da0c92aa12663c1ebfdd1d31f8fd12ff4fbbb3d334e9a4b5950445cb1753804be79a2d76b50bd882e5ececf509eda3d3558452320669db2d838edf4ab3689f6bb94482dc2339016356ddfcea36d4566b8795b4db2cc8c59b21f249e7aeef7ab66de25582789711ccb931b1ced2090467b8e9f9d4f235ba1fb44f6674c3448638957cc6f3882e17f8994f0a3ae3a8fd6aa4307cc548208eb53c5abdd4d0085963c720a91f2edec0739fd6af5a59fca076eb8f4ae5b495f98d9ca2edca2d8d9a33807835d3dbda46918ca83542dadc46338e95a493e1464d72ce6db37a6acb533b57b28fc9670a09af35d5e2fde357a4eab743cb65e0f15c06a8a1ddb6f5e7ad74e1937b9956696c71b749d6b1ae4609ae8af23c1391587749c9af5214ee714aa18d30e4d5375e4d68ca9c9aaaf1d6ca911ed0c2d7d716d6e7d49fe5553c37cf89f4cff00af98ff00f4215a1e245db6b6df53fcab3fc37ff233e99ff5f31ffe842bc5c62b5667a38577a67d2be1a0bf6ff1812393185fc0eeff001ae1b53602ce61d3314781f81aee3c35ff001f9e2e3fecaffecd5c2ea87fd05f23fe58467f43587537479e29ff004fce77726ba443fb95f9b1c5730a7fd38ff0f35d1231f2d78ede9490cb00823eefe94c66e4f39f6c53371ee7bd34b024607e34c0561c1c9c73e9513631f77233d714f66e3a0e48ed4c24f7e067a500358104e79e7a62a27ce0f51f853dc8ce00c7be2a2620e7033cd00456d7b3699a85bdfc0b978240d8f51d08fc413516afa769bac5e7dae3d49202fc3171907d33d39e94b273f8f6e6a8cb0a331f9573f4a9605c83c0da64c32fe2ab28feaa3ff8aad0b5f04786ecee12e2fbc4f6f75047f33431260b63a0ce4d72ce6dc1c6e427eb4e5446c118231ebd6958674be2cf118d7ef2086d86db1b50c2218fbc4e371fd07e5586ab80327bfa5246a001803bfad3bd38e9d3ad5210b8f6fd28fc3d7f86909f6ce7da96800207a7fe3b4dc75e3b0ed4bd79c63f0a6f3cf1dbd298011c743d3d2971f8ff00c0690ff4f4a5efc0ede940142e39bb5e31c8ed5d968b22acd668c76977daa31f7be527fa571b71c5d26467915d469fff00210d14e73fbf6ffd01a920e87d47e14ff9162cbfdd6ffd08d6cd63f85863c35663d037fe846b62a18c28a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a002bc57c72dff14ff8b3db538bf98af6aaf0ef19963e19f15977dcdfda519ce31dc53423c8c3722bd2fc8f36180ffd325fe55e5e1b91f5af588760820ddd7cb5fe42bbb03bc8e3c63b7290c11182e629181da8e18e3d01cd5eb6ba8e3d68de3a3989a476c0e58039f53d79f5ad0896c65587cd745007cc00e7b739c75ebebf5ed4ad676cd711b21558b03701939200cf1ee6badce2ee7372cfb9452df49da089af3fefcaf5ff00bea9a7644d20b61e6c6eb80674c11d39182467f3ad5369625cb92c33ff002cc03c124718e78ebde8315844482c7782329b8e3b1f4a4aa240e0cc4f2dcfde56fc0e2ad32a4f6d6b095940877060481b816cf15b0be4178bcb68d5403b8b0279c9c71f4c55d8e281d31e5286dc49f97b7a6693ab1bec4a84bb98d0d869cc461ef07fb3e5a93f9eec56ac1664c903ed2b14236a479c9efc9f5249cf6a94c71c5c85fd2a4866676c0e00a89372d6e09f2f427b686e2208be5090ae0823b1c01c9cf3c66b62d6231a02fd6abdbbe1461866ac00dd7764572cbcce98bea68c6ca4726ab5cc8ea73d8546970aa4e4f151dcfce8594f1592a7a9aba8ac675fce4a039fad7317e77138e7d0d6cdf4d146a448c4373c5731797637fc991e82bd1a14ce0ad591917ae7245625c724d6b5eefce59719e6b3d6da6ba97cb863691f04e17db935e8c23657386552ecc991326a068fdab41a3cd44d19c1ad89550e5bc52b8b4b5ff78d65f86ffe467d2ffebea3ff00d0856c78b86db6b51fed1ac7f0d7fc8cfa67fd7d47ff00a10af9dc77f1d9ef609de8a3e96f0c0cdc78b8ff00b3fd1ab82d606db3703b411ff2af4af03dac571a878a3cd5dc249163619eab86af37d7d04569b14702da2c7b715cfd59d28f35047dbb9e7935d046c7cb5e78ae701ff4d38e39add571b06413c0a48a2c6e1d877a69383cfe54cdc7d7bfbd377fcdc0039e0d31126ee0f38e6985874c6ee69a5863d791eb4dddc678ebef400e738ea73cd42cdef8fce86618e38c1ef9a8d986727f99a0063b679ff1a9f45b25d4f59b6b3906e8d98b328cfcc14138fcc0fcaab3313d4feb5368da92e95ad5b5dc99f29490c4649008c647d334981ec16fe0bb19a38cf921771da42a703a74ec7f1af3bf1ee85069335bdc5bc622f358ab81c06e0107ebd6bd16dfc5ba3cf0a94d7ada28dc72ad2ae477e84ff3af37f1df886d359bc8adeca6f3a284963203c64e0707bfd6b9e9fb4e67cdb172b5b439456e993ebeb4bbba7ff5e9a0fca39ee7bd048edfd6ba08141e98fd6901cfb7e14991c73fce93383c9e3f1a00767d7fad378cfe1e94b9ff003934dcf5fa7bd0029c7e9e94a4fe3c7bd349fe5ef4bbb9e3ae3de80295c63ed29f515d45891f6dd17031fe90dd47fb06b96b93fe90bc67a5757a7432493693220c88ae32d81f741522841d0fa93c31c7876d07fbdffa11ad7ae5fc12ee74db88da57911676da1bf8324e547b679fc6ba8a97b820a28a290c28a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a002bc2fc687fe298f15fb6a117f315ee95e13e3538f0cf8b3fec2117f3154b662ea78f03c8fad7ac73e55be07fcb25fe55e441b91f5af5d19f26dc8ff9e4bfcabbf2f5ab3831ced62edb31247eb5ab121619c62b16090a91c56cda4e1b033835db38f5386153b960a30420f39f5aacc02f1b76fd2b4872304547242194f158a7a9a4b5d8a90b953f29cfe357e395d7b735555446df2839a73c84f04629b57335269177ce0c7e6c0153c1e4bbe1790393594b1492b6013835b76315bdb42e26c8908e062b39d92d04a6e4cb11b22f000aaf77a834198c727a7151dc4d1c485c3678ae7a56965999c9cfd0d4421cda935711caac8d7935391480481f535049adca06236fc6b24c4ec4ef6fccd392d97209724fa56ea314723c4d47d47cd24b74e5e472dec2aac8aadf2f00fa919a96e37c49f29041ed54fce931e95ac5f632955ee473c312cf14ae04eaa46636c8dc3d323a53fec56fa5bc778f7f25a3caa4c512c3e74823208c9e806471eb47da6711b47b21656ea5e20587d0f6ab77ba6cbabce93d9a892511224b06407899542f43db8e08a4e6ef66ec8d69cd35cd1577d8c6b9d3a0b1b733a85be82e14ac13a92aaadfc595ea187a7e358ad17278aeb6e13ec1a4c766a639ae16e3ce9571e6471fcbb42b11c127b8f6ac4b8dd34a64648909fe1890228fa0ae8a351bff00333ad24bd7b1e7fe345db15b0ff68ff21587e1aff919f4bffafa8fff004215bfe3a1b45b8ff6dbfa560786bfe468d2ff00ebea3ffd08578d8efe3b3e8f2fd70e8faa7e1fff00c7ff00893febe17f935798f897222e3bdb447f435e9df0fb9bdf11ff00d7caff00235e61e29e2251ff004eb17f5ae7eaceb479867fd34eee79ed5ba8cdb061bb7ad606717a76fad6c861b179278f5a48a27dc0639efeb4858e796e33d3351ee6c727bfad34390c31c9cfad311316383860391de99b87d4e6a266ea49c9fad05ce3008c67d6801eedea78cfad44cc79c377f5a198f63ce7d6a32dc804f5f7a0009e9827a7ad42e338c9fd69e58f427f5a8c93818fd693020f29091c0c7d7ffad4e50001838e0f7a713c8e7ebcd3792473fad201c3a72d9ebde9a58800e7f5a03719c9c74ea29a4f43bb8ff7a980a38c10dfad1c6786fd69327824f1f5a3b1ff001a00524ff7bb7634dce548078c7ad0c4f63dbd69a0fbf3db9a0053c0eb9e0ff153b39eaddbd69a49c0e7b7ad00f3d7b7f7a802a5c7faf5c1f4ef5daf8718968100c0de2b89baff005ebcfa77aedfc2d96bbb505bac8bdfb6450b707b1f42781411657a0ffcfc37f335d65733e0e50b6f7c07fcfc37f335d354bdc10514514861451450014514500145145001451450014514500145145001451450014514500145145001451450014514500145145001451450015e0fe363ff0014cf8b7db508bf98af78af05f1b1ff008a6bc5dff6108bf98aa5b09ee78ca9e47d6bd9604f32dedfd7ca5fe55e2c1b91f5af70d3ed5a7b281c76451fa0aefc03b5d9e6e63b449a2b663d4715720b56560403442b340791b87fb42b5ada78a4003a6d35d739b3cf84531f6b1b6066adb5be47dd069c91a90369a95495fa573391dd18a48a0d6a01c9cd37ecaa581ad43b5876a6188751473bb10e08ab1a043d052cee4b124e7b54eca0540e85b39ac9caeccaa5b96c8ccb9dcea7d2aa794718e726b5648b38005363891255320ca679e338f7c77c75ab8cec8e17072958caf24f5e69c1481815a32883cd661f246586de3076fb7e9c521fb2ed38dc48e9cf1d3a74ff003e94fdaa0fabcba198f1163cd466df8ad802d093f7c673f87e9445041bc9b87d88149e3ab9c7dd1ee68f6c899619f32463244f0cab2c676c88772b6d0707f114456f6e6e7cdbc89a7521b767925883cfe7ef5b8f690cb6f1cd1452c5ba4f2cc7210dce0104118c8e6a596cadc5cc96f1dadde558a09999361c1eb8eb8a1d68bdcd2185a8b6d96a72f141240922c24a2c8851d400430ebd0ff9f4a81ec8fa1aee21d3adfcc11984b37f7b0dd7ae73d318fc73524cb676d102b1c6c09c061c8aa8e2127a14f032b5e6cf9d7e212ec9a243c10edc7e02b9bf0cff00c8d1a5ff00d7d47ffa10aebbe2a3abeb0ccabb54cadc0fa0ae47c33ff234697ff5f51ffe842b9716ef56fe87b78056a091f557c3cff8fbf111ff00a7a5fe46bcbfc55d00ff00a758ff0099af50f877ff001f5e21ff00afa5fe46bcb7c5fc3a83ff003eb1ff0036ac3a9d48f2f627eda431e73d8d6bab36d1823a7ad6216ff4d3b79e6b5c7dc0771ed422890b76073cf1cd21623a9e3ebda9bb8e7ad2646eea739e9ef4c43d9cfe1f5a697f53939f5a696c82493d7d69bb8e0e0f19a00e9fc3be184d6b4fbed46eef4dad95a1557291f9ac4b71d01e838e6996be15fb678a6ef478b5384c36f1b4a6e93e752aa01ce01f7c75ab9e09d4b4fd3a2bd76d5e4d3b52dcbe4bc99685d33cab281cfe9d6addcebfa143a8f8aeeec6458cdd5a882d55632048c47cec06381f5a40661f04cbff000980f0ff00dbd7987ce1388f82bb777ddcff005a9edbe1e4f73a95fdab6a091ada940927979f3b72171c678e07bd6ac5e28d1bfe12bd27547bb0a89a5791704c6c76c80600e9ee7a7152dbf8cf46dba2bbdd6c942937bf231da443b17b739cf6a43395d0bc2b16a7a52ea179a8fd92169fecf1911efc363ab1c80a3dcd554f0d97d3b52bc17b1b2d85c2c0420dcb26e206e07a639adbf06eada669d684cbaa9b497ed04dc4332978a787fd950386f7eb4db0d5f459e0d7b4f370b6105dddacf6ecd192bb55b38c0e9401553c10efe26b9d19b5155305b89ccde5f041c718cfbfad50d43c2971616892b4eaced7c6cc26dc723386cfa7e15bb378a74d97c57ac5f2cec2de6b036f0c9b4e5dc018f7c71dea0d67c4fa7dfe87a51472d789731cf711853d42e188278e71fad00676ade17834fb5ba316ad1cd7566545c40c9b3a8fe124fcd8cd7343ebcfd6bbad775bd1e6d3b56682ed6e65d4191a28c4255a0c00092c7e82b85ce3d7f4a042127f4ec6939ec474f5a56241ea7a5267af5e9eb4c043f5ec7bd3b39ea7b7ad2163cfd2973c839278f5a00a3747f7cb93e9d4d76fe112bf6db618c7ef17bf7c8ae22e8fefd7f0aedfc1fb8dedbfcdfc6bdfde85b83d8fa33c21fea6fbfebb9fe66ba5ae6bc21fea6fbfebbb7fe84d5d2d4bdc10514514861451450014514500145145001451450014514500145145001451450014514500145145001451450014514500145145001451450015e05e3539f0c78bbfec211ffe842bdf6bc03c687fe296f171ff00a8847ffa10aa5b313dcf170791f5afa0340dada6c41bfbabfc857cfaadc8fad7bfe80c3fb322c8fe15fe42baf09b33831cf589b8b6ea40c1cd3c5b63a29151a3e00c1e6ad472b63ad6edb38747b8a9234400e2ac24e1baf1516fcf5506946cfeed4b2f99a2caaeee41e2820a8c83510c05e09a78738eb59b2d34d6a2194fa546c73f8d48dcf6a691c52d0c6422a29cd31e3c1e39a763d29707d6a6e62d5c48d23976232ac4370532330e493db9fd300f7a55861042b120f19e9c700ff523f0a4fb346cc59a2424f04951934f5b4880c08531e98a86d9b2706b588822b76491b73031ae71c12464a8fd40fce9d6f646e66083fe04719e3bfe34f16ea08206003d07009f5c7ad39ede29461d1587a1153ceca708b6ac88ee219c18e5950dac28408b7ae7673f78fa93deaca2ddc0267bcb9796275217790433e460a0eddf8150259c31b131c48a7a640c522dac51b6e48d15bae40e94ae6b1924d9235caa2b46ee143a32ee3c28c83f9565cb69e40f2c3842493e403edf7b1db3d2b45e10e30c339ed5025bdbabc91c4610e870e884641f7154a7adcce49ca363c07e280dbab107b4adfc8572de19ff0091a74aff00afa8ff00f4215d6fc581b75d75f495bf90ae47c31ff234e95ff5f51ffe842ab13fc4fb8f4304ad4123eaaf875cdc7884ff00d3d8fe46bcb7c63912ae0f26d23fe6d5ea5f0ebfd77883febec7fe835e59e33c09133ff3e91ff36ac7a9d28f2b727eda73c1cf6ad552768c0eded5904ffa63639e4f5ad318da324f4f4a48a24cf3f78f5a0927d87afb5339f4fd0521e1b3ce73d31dea843b9c703bf7c5213ef839f5a6b743938e476a3b703bf7c7e3480524e3a607e14de7a0fe941033d771cf1c521ea7248e7d050018faf4f6a6904638e3f0e69473dbf4a43d3b9fc28011470303231d702908e467d3d05281d39fc314841f978c0c7f74500183803be4f61401c0e3f95281c0f4e7b5340c7afe5400a3b7e9d290727ffac2948e3d3f0a6e3a020fe548008c927e9e9484f5e3b7b52f3cff0085210403c76ee29809d47e1ed4e6e3b76f6a6e3b60f4f4a711f5e83b50052b8ff5c3af6ec2bb4f08902fad7aff00ac5c73df35c5dc0fde8e3d3b5767e12cfdbed79cfef173f4cd0b7067d1fe0f3986fbfebbb7fe84d5d35731e0d3fb9be3ff004f0dff00a13574f52f704145145218514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005780f8e22783c35e308dc82eb7f1f23fde15efd5e0df113fe407e33ffaff008bf98a684785a9e47d6bdfb4195574c881201da3a9f615f3f8ea3eb5ecf68dfe870f3c6c5fe42bbf031e6ba3cdcc656e53b05b84cfde5fceac25c20c7cebf9d71e1a9e1ebbbeae797ed59d98b88ffe7a2fe7522dc45ff3d13fefa15c4eea50d4beade62f6acee56e22ef227fdf429e2687fe7aa7fdf42b83ddef485ea7ea8bb8d621ae877de6c3ff003d53fefa1486684ffcb64ffbe857025a9a5bdea7ea49f513aefb1e822487fe7b47ff007d0a9049067fd747ff007d0af373fe78a69228fa82fe617b7f23d344b6ff00f3da3ffbec53ccf06c389e2cf6f9c5795b1cfa5309c0e94bfb3d7f30d62add0f52139d814dcc1ff7f7247e3fd692394027ccb9876e38026cd795134c38a9fecd5fcc68b1cfb1eb22e02bb11730762333020ff8537cc564c35e42873d44bffeaff3eb5e4ac476a8cd1fd98bf987f5e9763d816e94ab2cb756e41071890727de991dcc25f07ecb0a0e844e1c9fe58f7eb5e3ad8a61e4d3fecc5fcc3faf3fe5327e2d156f1048c8c194cac410720f02b91f0c7fc8d3a57fd7dc7ffa10ad8f1a7dcb5e31cb1fe558fe17ff0091ab4aff00afb8ff00f4215c58b8f2d5b7a1ebe09de8a67d53f0e3993c407fe9f07fe835e57e34e255ff00af58ff009b57aa7c38fbdaff00fd7e0ffd06bcafc6d8f3d7affc7ac7fcdab0ea74a3ca5f26f4f6e6b4d4e147ca3a0ed596dff1f87bf35a63951cf6f4a486380e739cf3e941e4e3000f5c53401d94fe54103279cf3d2a8031c1c0cf23b5274e09c73d8504707b7e14981d8679eb8a402b6318c1519eb8a69eb8033f8529ea7a1e4f1b69b8cf39c7e1400700f3fca938f4fd2823dbf4a438c7ff005a8001dbe5cfe14840e07b7f76931d3f5e0d26064600e9e86801e3a74f5fe1a6e3a0dbc7fbb4607619ebd01a4c1e3fc28014741919ff0080d1c67a7fe3b4de38200e9e86938f4fd0d002f1e9ff008ed21c60e47e94119ed9e9da9bd8fd3d2801dc60fd3fbb4a707b761fc34ce3078ede94a7be47a7634015a7c1957d38aecbc2600beb5cf5f317b77cd7193ffac181e9dabb3f0983f6eb6e33fbc5edef42dc67d2de15b392dacae26794389e67655031b1771e3df9c9ae86b334018d222ff79fff00436ad3a97b890514514861451450014514500145145001451450014514500145145001451450014514500145145001451450014514500145145001451450015e0bf113fe409e34ff00aff8bf9ad7bd57827c453ff125f1a7fd7f45fcd69a11e100f23eb5ed7636f2c9630ba85dbb40059d572703d6bc494f23eb5ed16f83a359e4776ffd052bd0c05eeec799995acae5f16b37ac5ff7f53fc69df669bd62ff00bfa9fe3502d9a2244f3bac4251b93e5ddc67193e9cfd4d345bb142e916e45fe20bc63d7a57a49b7d4f29a5d8b42da5f58bfefea7f8d2fd9a5f58ff00efeaff008d5636b2aeddd6ec32703e4ef561f4e64b74631379a5d91a3298c0014e7ff1ea2ed750e55d85fb34beb1ff00dfd5ff001a4fb34beb1ffdfd5ff1aa8f1ec72ae9b58704118229a557fba3f2aaf7bb99be4eccb86da5f58bfeff0027f8d34dacbff4cbfeff0027f8d54c2ff745210bfdd15494c5ee762d1b59bfe997fdfe4ff1a69b49bfe99ffdfd5ff1aa8553fbabf953484feeafe545a62f70b86d26ff00a67ff7f93fc6a33673ff00d33ffbfc9fe35576aff757f2a6955feeafe54fdf04a1d9968d94fd7f77ff007f93fc6986ca7ffa67ff007f93fc6ab154fee8fc8546cabfdd5fc851ef8fdc5d0b6d6371ff004cbfeff27f8d446c2e7d23ff00bfc9fe3558aa7f747e42985549e147e429da635cbd8b274eb9c748bfeff27f8d34e9d73e91ff00dfe4ff001ab9e1cd0d75fd721d3cc9e4890312e17240009fe959da8d90b2bfbab52431864642c0633826a39df372df5358d35cbcd6d0e47c730cb6cf6d14a8524527238f41e9589e17ff0091af4aff00afb8ff00f4215d37c4bff909c5f41ffa02d735e16ff91af49ffafb8fff004215e1e2ddeb367bd8456a491f547c37ff0098f7fd7e7fecb5e57e37e255ff00af58ff009b57aa7c37e9ae9ffa7cff00d96bca7c72479e9c7fcbac7fcdab0ea7423ca587fa61fad692e368f93b566363ed67bf35a6a46c1ce38a431c4727a7e549807f8703d7148197a85fd286239cf27d29801dbce07a76a43f97e141391c9c74f5a42475c73c500071d863f0a438c74cfe14139639e7a8ef4d278ea07e7400bc7f914de3b0029770e807ea698c7d79fce801720e38a3b8e9d0fad203c0e8303d682d9c600e9ea6801dc6070075f5a67ca71f2fe868dc31cf3d7b9a4dd8c74fccd002f000ff00ebd2647e1f8d26ee98c7e74647623f3340c438a339cfd3de82d8eb8fccd37775e9d3d4d021dd8fd3de838ec00e07ad372307a74f534e2dfcbd4d032bcc3f7ab8f6aecbc278fed0b5ff00ae8bdbdeb8d988f301ed5d7f855b17f6d81ff2d173c7bf5a16e07d53a0ff00c8222ff7e4ff00d0dab4ab3340ff0090447fefc9ff00a1b569d43dc4828a28a061451450014514500145145001451450014514500145145001451450014514500145145001451450014514500145145001451450015e09f11bfe40be34ff00afd8bf9ad7bdd7827c46ff0090378d3febf62fe6b4d099e06a791f5af68b76ff00892d9fd5bff414af165ea3eb5ecb617662d3e189ade095400ca64dd904800fdd61e95e865f7bbb1e6e636b46e6a8d421960b64b980b3db8daacb8c326738607af24f3efd2a75d6fcb9d2e2181526443128cfc810924646392338eb599f6d4ff9f0b4ff00c89ffc5d385e27fcf85a7fe44ffe2ebd1e44fa1e5a9db666c5bdf89cddac48b1c72132cb13303bf3c155e9ea79ebc7e6f9f59890cf6e63792194924ee01d410b8e791952a3d73589f6c4ff009f1b4ffc89ff00c5d3bedabff3e569ff00913ff8ba8f65aec5fb5d2d71aee19c905ba9c6e393f9d373ef4ffb6aff00cf95a7fe44ff00e2e8fb68ff009f2b4ffc89ff00c5d6e9c97439da8bea464d34b54c6f17fe7c6d3ff227ff001749f6b5ff009f1b4ffc89ff00c5d3e697627923dc873484d4ff006c5ff9f1b4ff00c89ffc5d27db13fe7c6d3ff227ff001745e5d86a9c7b90134d39a9fed8a3fe5c6cff00f227ff00174d37a9ff003e169ff913ff008ba39a5d87cb1ee572d8a6139ab26f507fcc3ecfff00227ff174c37d1ffd03ecff00f227ff00174734bb0b923dcac4d34d5a37b1ff00d03acff393ff008ba69bd8ff00e81d67ff00913ff8ba7cd2ec52a71ee697852fa7b0d6527b77b78e450487b860aa3b7723d4f19159bad4ef36a771248632ecd9263605493c9208e3afa530dec5ff0040eb3ffc89ff00c5d21be8b9ff00896d9fe72fff00175972be7e7b1d375c9c97398f899ff2148be83ff405ae73c2dff236693ff5f71ffe842b67c7972d797304f22a2b3e7e55ce070071c9f4f5358de14ff91b349ffafb8fff004215e2e293555dcf670aef491f53fc36fbbaeffd7e7fecb5e4fe393fbf5ffaf58f1f9b57ac7c36ff0057ae1ffa7cff00d945792f8e7fe3e13febd63fe6d58f566e8f2c6e6ecf4eb5a036ed1c76f5acd6c7dacfd6b4d49d839edeb48a17939c91f99a4eb9c0fc4e68523923f9d2b3119dc73f8d31087047bf1eb484f3c7f3a52cd8fbde9de98481efd280038edc7e2690e3bff3a716241dc73f434d2c7b103f1a004ddfed7eb4d278e3f9d2ee19ebcfd6909e3af7f5a0040c381dfeb4edd8c73ff8f5341e9fe34d2dc8f5fad0317b0c1f5ef4646073fad1938e4faff151bba7f8d0019e064feb499e393fad2ee38ebfad26ee7aff00e3d40099e7afeb413c1ff1a33ea49c63bd1b8f3c9fce80133db3fad2e78ebfad216ebcfeb4a4fafa7f7a80209bfd62f3cf1debacf0c9c5f5affd754fe62b9398e5d7f0aeafc3bff1f96a76ff00cb54fe6285b81f55f87ce7478cff00b4ff00fa11ad4acaf0effc81a3ff0079ff00f4235ab50f7120a28a2818514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005781fc47ff0090378d07fd3e45fcd6bdf2bc0be23ffc81fc69ff005f917f35a684cf0307e61f5af5bb56ff004487fdc5fe42bc917ef0fad7abdab7fa2c3fee2ff215e9e5bbc8f2b34da25bdd4a1a99146f2b848d4b31e8055b7d3668d725a3cfa06ffeb57a152bd2a7a4dd8e1c3e07158857a30725e441ba977546728e54f5146ead2325257473d4a73a72719ab35dc973466a2dd52c70cf2c8a91c323bb7dd555249fa536d2dc849bd83349baacff00656a5ff40fbaff00bf2dfe154db72b15604107041ed52a517b329c26b5698e2d49ba999a4dd544abb1fba985ab460d16f2e103e12353fdf6c1a95bc377bb498de09303eeabe0fea315ccf1b8752e573573bd6578c71e6f66ec63939a43c53a48de191a3914a30eaa7ad32ba534d5d1c9c8e2ecd01a61a526a48adda543233c71c4382f21c027d07049a4da5b97185f62034c26a79e06876b6e5911c7cb221ca9fc7d7d8d573d69269ec5f2b5b9caf8c3a5afd5bfa56778507fc55ba4ff00d7d47ffa10ad1f187fcbaffc0bfa567f84bfe46ed23febea3ffd0857878cfe3b3dcc27f051f52fc36ff51adffd7e1ffd04579278eb8b94ff00af58ff009b57adfc36ff008f7d6ffebf4ffe822bc8bc77ff001f29cffcbac7fcdab9fab3747969ff008fb3f5ad152368fa7ad669ff008fa3cf7f5ad104e07d29143c31e7271f8d26e193819f4c9a68239c66863d4138fc698852c3d49e9de909e3a81f8d193e9fad34e39eb9a003772704fe74d27d49fce9cc7ae7f9d33279c50019f7fd6933e9fce97bf73f8d276e73edd281867a73cfd6824e473d7de804e000293d0f39fc28014374fc7bd213d39fd694671cfbfa521e40e3f95020dc7039e69a49effce97d3afe9473fe7140c6863cf3fad293d79edeb4eee73fce93b1ff00eb50037279cfa7ad38927bfeb4763d7f3a527af1fca802bcc7f78bebc75aeafc3bff001f76dcff00cb54fe62b94979907e15d5787c62e6df23fe5aa7fe84285b81f557873fe40b17fbefff00a11ad6ac8f0e7fc8162ff7dfff004235af50f7120a28a28185145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140057817c48ff90478d3febee2fe6b5efb5e05f127fe415e34ff00afb8bf9ad3888f025ea3eb5ea96adfe8b0ff00b83f90af2b5fbc2bd3ed9b16b0ff00b83f957a796ef23cbcd3689d0470b5b69f0dcc7f3190fcc3b8e702b6ff00b32cd5425e5f4ab26406f290614fa72726b0f4ebe0d6a2238dd1f63f9e6b5008752bf5d8f32f9873244aa0fb9c36781f81c7bd79929d155aafd71b5d8f4b0b9ce2a96169e1f0da34fefb96750f085bc104d347792bc91a175071b4f19ae4377bd77baf5fa59e992925559d3cb897ea315e7c2970ad5ad5695494db71bfbb739388aa7b4ad094b59db5242f85247615dec3e39367a20b8bcb487cb8f6c50aa939790fdd1cf00601271d8715e7cc7e53f4353eb3a5df6aba04305a2b34b1b89910f1bc8041033df9c8fa57b18f694a3739b2a4bde6fc8d0b9f897e24d3f55315e5ad83c00ee3124641dbecd939fc6b6f59f1736a9a101159c296f72a0ab91f3007afe3906bcf748d3afaeb7d95c69b76d7048da5a270c9e80e7803eb5d46a16a2cb45b4b141bd6d6308d22fdd6724b311ea3271f415caf96328b89d9393a9cd75a2333357b47b596f3538a2822695f96daa33c0ef59f9ae93c077b15878b6d659982a3868f27a648e2bd5c45dd1928ef63c7c1be4c4465d99d8e9ba6dce9f0c93dcdac724a1d55430dc1579c9c1f7c517acb79a60b97b71048acd1b8098190bb830f4f422bd0330ce9f36d61ef50cba7d9c911468d42139c038ed8fe55f3d18534b96c7d6cb1b5653e79eacf03d6a659ee639179257048fad65935d77c438aced75c8eded11142c7962a0679c75ae3f35ee6074a291f3f9ace3531739c55affe475df0f749b1d6b5d9adefa2f311202e837630411fe35e84de12f0f2df7d8e68a20c537c319386c6704fbf6ae1be1567fe12d931d3eccffcd6bb8f16e9f7773ab59cb6513bce89f2ed1d39ee7d2b831727edad737c2afdd2695d938f03e8c5c27d957c8c64ae4e777afe55e4fe3bd36d349f154f69649b215443b73dc804d7bae9b6f750daa8bd984b29e4e3a03eddebc47e2567fe138bdcff00763fcb60a5809ca552ccbc7454616479578bf9fb2ffc0bfa551f088ff8abf49ffafa8fff0042157bc5dd6dbfe05fd2a9f84067c5fa4ffd7dc7ff00a10acf19fc665e17f848fa8fe1b7fc7b6b5ff5fa7ff4115e41e3cc8ba4ff00af48ff009b57affc36e2d75a3ff4fa7ff4115e41e3c39bb53dbec917f36ac3ab374796b7fc7d1fad6803f28fa567b1ff004a3f5ad05fba38eded48a1413cf6a69efb79e69477e4d0c4f39e3f014c426783d7f4a093f8529271d3f414c27d49fc85002e73900e69bea09fd052927bae3f01487d97f4a0039e9fd0521cf18c1fc0507f3fc293b6791f85030ec38e7e949cf1c7e947a617f4a31fe71400a338e99e4f6a4c1c838efe94a07038f5ed498381c7e9400bd40ff0a307a7f852638071dbd2800e0f1fa500183fe7149cf3fe0294e7d0fe428ec78fd2800e4e7e9e82839c7e5e947383fe141fa73c76a00865cf9a3d6ba9f0f1ff0048b7e7fe5a277f715cbc830e2ba8f0ff00371067fbebfcc50b703ea8f0d1ce8b1ffbefff00a11ad8ac6f0c1ce891ff00beff00fa11ad9a87b8905145140c28a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a002bc07e24ff00c82bc69ff5f517f35af7eaf02f895ff20cf198ff00a7a87f9ad38899e02bd457a6db1ff4587fdc1fcabcc87de15e956c7fd161ff00707f2af4b2dde479b996d12fc56f72d1f9f14726d5cfef147031d6afd8ebb77608fe5240d2371e63a7207e047f2aa516a12450a46117722b2ab824101b39e9f5356bfb767dc18c316474eb81f867fcf6ae8c4e0e8e274ab04ce2a551d3f7a2eccad7579737d3f9d73334927404f6f61e95164d5c93599a5b7789e38fe650a5c0f9ba7a9fa9aa00d74d1a71a715082b246551f3c9c9bbb63f3c1adbfedfd7a3b240d74df6761b54b42986fd39ac20d57e2d51a37473044d22208f71cf2074e28ab4d4ed7572a94dc3e1762c7fc243ac11b5b519593b230057f2228bbf106ab7d6cd6f73785e16c653cb519fd29835cb8f359ca46770c608276f5e99e9d7f4a8a7d524b8b696168a31e63062c01c8c6300678aca34209fc26aeb4edf132aeea7c51cb33e2146660377cbd47bd419a9adae4db4a5c286c8c10dd0f7e477e9fe7ad744b6d0c22aef53a1d3bc71ad69f188fcd59d57a79a0e47e208ab175f1175a9e3289e4c44ff0012824fea6b246b5726da311dac6b1c7f2ee50793ee734d5d6ee1595bec91641dc0e1ba8c8f5f735cce9c7f94eb55a76b2919d717335d4ef3dc4ad24ae7e6763924d444d695c6aff69d3cc1242048768de091f28f5eb93ef5999ade2f4b18496bb9a9a45deafa539bed2da4898828645407238c8e41abff00f09f78a98e06ab2127a7ee93ff0089ac68353b8b7892242bb137647f7b23b9eb8f6a96ef586b983cb16f1c6770394e3000e9fe3cf6158ce0a4ef257368c9c568cd89bc6fe30b7389b519d3d37429cffe3b5ceea3a95e6ad7af797d379d70d80ce4004e318e98ed56ceb933214f263db9dddf39e393cf39c0cfad56bdd4e5bd88248883e72df28fafafd69420a2eea362e526d5ae719e2c1936bff02fe9553c203fe2afd27febea3ffd0855bf1572d6df46fe955fc1');
SELECT pg_catalog.lowrite(0, '\xe3fe2afd27febea3ff00d0857978bfe333d1c3ff00091f4ffc375ff43d5cfade1ffd04578d78d9f7dd039c916e807fdf4d5ecff0e38d3f563ff4fadffa08af12f17f32afbc0bff00a13561d59aa3cdcffc7d1e3bd680fba33e9541bfe3e8fd6afa9c0181dbd2914c519ec314840ec33f85038cff008523679e31f8531063af27b76a4ff80f1f4a0f7f97f4a43400b8eb8e7f0a423ae78fc294fd31f85348f62681811fecf1f4a4dbd38e7fdda31d79fd2908f4fe5400b8236f6fc28db9c0c718feed20edd7f2a711803e9e9400003038cf27f86936f1d3ff001da500e3a6073da931d303f4a0036fcbd3f4a36f6c7fe3b4633f97a52e3dbf4a0031d87fe8349b7af1dbb8a31e83d3b5295ebc75f6a0031c1e3f4a0a903a7a76a3070703f4a0af7c60f1da8022901f3062ba5f0f9c5cc1824fcebfcc57332e77804f7ae8f42389e1c8fe35fe6292dc0faa7c2a73a1467fdb6fe75b7585e1139d022ff7dbf9d6e76a97b890b45145030a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800af01f895ff20ef19ffd7cc3fcd6bdfabc07e25ffc83fc67ff005f30ff0035a71133c0475af48b63fe8b17fb83f9579b8ea2bd12d9bfd1a2ff00707f2af4b2dde479f982d2259ddef4bbaa20d4b9af58f2da250d4bbaa2069c0d04a4499a70351e69695cab0fcfbd19a218ccd3c7106da5d82e4f419356751b13a75d980c8b21001dcb45fa0f94ae0d2e6b63c39a145ae493f9fa84566910501a404ee663851f9d63cc8629de324128c5723d8d429a72b17ecda572fd8ead25947e508e368892c4118392319cf6fc3d7f1a9ee3c417336cdb1c6309b581c90c79cf7f7fff005d548b4e6974b9af84c8046db761ea7a7f8d52cd4f245bb96a524ac3b39a4cd2669335424876693349450d94901a434b486a6e524737e28196b6fa37f4a87c1ebff157e93ff5f51ffe842a7f1372f6ff0043fd299e0e1ff157e95ff5f31ffe842bc5c57f199ea61ff868fa6be1d7fc83b56ffafc6ffd045787f8bcfce87fe982ff00e84d5edff0f38d3356ff00afc6ff00d04578778b8fdc3ff4c57ff426ac7ab35479e11fe927eb5787dd193fa551c7fa49fad5d1f747148a14679e31f850defcfe140ef93487a1c71e94c40d9ef8edda933ce00fd28207a73f4a4c1cf27f4a0629cf5ebf85379f5fd2971d71fca8e013d0fe14009f87e9498f6fd29dd3ae3f5a4c1c0f4fc68001dbd31e94609038ede9401d3ffaf41078c91d3de8001f4f5ed460f07fa52a8e9d00e7d68ec31fd6800c74c0fd2979f4fd28e71ce3a7bd2e303b7eb40098393c7e94608c9031f852e39fcbd69483ce7f99a006e39e47e94a549ede9da97079e9fad18e0e0fa7ad0057947ce38fd2ba0d0f89a23fed2ff3158130f9c56f68dfeb2338c7cc3b7b8a4b703ea7f069cf87623fedb7f3adfed5cff828e7c3917fd746fe75d0527b890b451452185145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140057807c4bff008f0f198ffa7987f9ad7bfd7cff00f12ffe3c7c67ff005f30ff0034a7111e063ad7a05b7fc7b45fee0fe55e7e3ad7aef84b44b2d5ec6e26bdb99e25b7588288543162d9f5ff0076bbb095614633a93d123871db2b98fbb14a1b35dcff00c219a3f9266373aa7940e0bf9298cfd73518f0a683d7edda8ffdfb4ff1abfedcc0ade6792ea534ece48e3375381ab9aee9f1693ad5cd9432bc9147b76bb80198150dc8e9de9fa369d16a2f22c923a052a06d03be7fc2bbaae2a9d2a3eda6fdd3ab0f86a95ea2a54f7651069775752be11b5638173313ecab4a3c276b9ff8fa9bfef95af33fb7f03fccfee3d3ff0057f1bfcbf89cb038c7b52ee2c739c9f7e6ac6ab66ba6eab3d9ac85d626003118ea01feb5abe13d021f10dddc433dc3c2b146186c00ee39c57a55b154a8d175e6fdd5a9e64284e553d92dcc40ccb9dac47d0e3a52673c9f7fc6bd1c7c35b0c7fc846ebfefd0a5ff00856b619ff9095d0ffb66b5e42e23cbbf9bf03b3fb3313d8f39dc40c7e94669d7510b6bc9e007708e464dc7be0915d5f873c0177e24d2575086fe0854bb2047524e457b0eac231537b1c91a7293e55b9c9668af451f086fff00e82d6bff007c351ff0a8b50ffa0b5aff00df0d59fd6a97f31a7d5ea2dd1e77455ad52c5b4ad52e6c1e457682431965e01c7a56b69ba069f7be18bcd526d5e386e61dfb2d58aee7c01ea73572a914ae2506f439dcd275aebee3c27a4c2748d9afc0ff006d709360a7ee015dd93cfe1cd490783f47975fbcd3dbc43025bc10a3a5c6536bb1fe1fbd8a8f6f0ee68a948f2df118cbdbfd0d1e0e5ff8abf4affaf98fff004214ff0012281731aab6e552c01f5e69de0e5ff8abf4affaf98fff004215e6625deab3ba8fc07d21f0f8634cd5bfebf1bff4115e19e2eff967ebe48ffd09abddbe1f8ff896eabff5f6dffa08af07f171e23edfba1ffa13563d597d8f3fe3ed0703bd5d1f747d2a88ff008f83d3ad5d03818f4a450abdf03b52377cf5f4a067b91f85041c7ff5e9880f7ce2938f4f4a4fc73f8d1939ebfad031493ce7fad193edd7de93ae707f5a073dff005a005c8c71fd68cf4ce3f3349f88fce97a8e0feb40003d3a63ea683d077e3d68f4f9b9cfad1ce47cdfad0028238c9f5f5a076e9f99a074ce477ef4a3b7cdfad0019e9c8cfe34a3ebfad1d873dbfbd4a07d3f3a003fcf5347af39fc6971d7e6fd683c672474f5a004f5e7f5a539c7ff005e81df91f9d2e38e083d3bd022bcc3e715b9a37df4cf3c8fe758928f9c740735b9a3f0e98e991fce92dc67d47e0839f0dc7ff5d1bf9d7455ce781ffe45a8bfeba37f3ae90527b890514514861451450014514500145145001451450014514500145145001451450014514500145145001451450014514500145145001451450015e01f1338b2f190ff00a6f09fd52bdfebc03e277169e32f79a0fe694e3d44cf021d6bd8fc1b218fc3fa9b0ec6dc7fe875e382bd7bc20acde1bd502ab31cdb7419fefd3aaaf84aabc8e0cc15e9dbc99e9da8ea0cdf0eac9a189648c9092b83831b03c1c7e1fad711f6c383cd68e85adcba5c7359dd5a35ce9d3ffac84a9e0f4c8fd29be23b8b0bfbd5974cb29611b30e047b549ed81ebdabe62b525562a6b756563c3ad4bdac14d6e9256398f17b67c4f75feec5ff00a2d69de1a7c4b71f54feb5178c32be28ba041076c4307feb9ad2f868e64b8ff807f5afb0cc97fc25b5e4bf43e9f225ff000a30bf9fe4cf5af02dcdb0d4668a603cd74fdd923b0ce4562eb77504fad5cc96c0088bfcbc63f1ad0d1fc49a56931218f4966b808034c5f93ebf419aa1ac6a5a6ea0035a69ff006598b6e62ad9047d3d6be465caf0f1a6a4aeb53ed29c27f5b95570766adba380f141ff008a9afbfde5ff00d056bb5f851a5a5f43ab4cadb27531aab1e98e4e08ae23c527fe2a7beff797ff00415af44f832f8b5d631fdf8bf9357da6269c6ae07927b348f82a6dc716e4bbb3ab7d3ef926319b7dc473b94020fe3daa6b4d26e6e4e64510c63bb2fcc7f0ed5d007007146f19c8af968e498752bbbb5d8f65e366d5ac7ce7e2ab68acbc57aa5bc2088d2e18283f9d7a5fc380ff00f08623c6c038b89319e8791c1f6af37f1a367c69abff00d7cb57a57c319611e0e556950113c990587b57d5e257fb3c52f23c7a1a556cce96fafb5a95ef26b8bb8e3333450c56b215080679381c9e0f5f6e39e3a1f0cea3777f15c5a5ccc65fb24a633290374838201edc77ff0039af77e158daee496c3554b68a573234442ba863d48cf4ad9d1b4db2d1accc51dcac923b6f9256619763d49af169c2a295dec7d0622bd0951e586ff91e2be2dff91b7551ff004f0dfcea7d3ae3464f0d5dc775a25cdc6a07779578884a47c0c64e7b7d2abf8b1c3f8b355652181b86c11ce6b6b456f110f036a02c8591d2cf99e77984f99d06ec7635ef4ff871f91f3b15efb21b8b9f0e93a4f97e1bbd8f63afda7319fdf8dbc85e79e79ed524173e1a1afddc8fe18bd7b36890456c223be36eec467a1fad6a5ebf8b73e1ef3d74de255fb1ed2dcb6ce37fe1e9535abf8c7fe12ed44c6ba61d40dbc5e7824f97b39db8f7ae7be9ff0007ccd6da9e39e210ad711ed52abf3614f6e6a4f06aff00c561a57fd7cc7ffa10a4f100637837e37e5b763a67353f8313fe2b0d2bfebe23ff00d08573e23f8acd697c07d13f0fff00e41faa8ffa7c6ffd045782f8c01511ab8e7ca1ff00a1357be780062c754f7bc6ff00d045783f8df2275f4f287f36acfab2fb1e74bfebcfd6af8e839aa03fd79fad5f07e51ce69140b804e3d286e9c9fd6807af3fad21270707f5a6213ea7b7ad271fe4d29ebd49e3d690927be3f1a061dce4feb4ec9f5ffc7a999f7cfe34bf8feb400b9e783ff8f52fa7d7d69b9e393fad2e7a60feb400a3b73c7fbd4bc6473dbfbd480f23e6c9f4cd2e7a7f8d00283df71eff00c54a3381cf1f5a07b67bf714761cfeb408518e3939ff007a9411fdeffc7a81c8ebfad2f5e87f5140c4fc78cff7a97b9c367fe05411c75fd69d8c6727f5a006f63f37fe3d4adc8e4fa7f152f638fe741071f7bd3bd0057947ce3ebeb5b7a4afcca07a8fe62b1e4fbe39efeb5b5a570e98e991fcc50b703e9df02e7fe1198b3ff3d1aba615cd7814e7c369ff005d5bfa574a2a5ee24145145218514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005780fc50e2dbc603fe9ac07f54af7eaf01f8a433178bc0fefc07ff0040a71133c0475aeff449b5112dbdbe9b7b35acb71b2326290a6ef638ae0075aecad2678a38648dcab2805594f43eb5e86062a5cd139715a5ac74f2ff00c255146245d6ef1c6096db76c3601eb9231fe34d2de2f08ee752d476a0dcc45d938e33cf3d71dab121bfba8102c5732228ce006e3f2a71d46ecab06b994861b5816ce4600fe42bb3d825d11c8e424934d712b4b7134934afcb3c8c493f527ad4d058dc5cc6af0cdb0bbf968a1882ed8e831c77ef55037153c3797102b2c33c91ab7276b11fe7b56d38270e5e84c24e2f993b32ec7a2ead24664134823085f779e08200273d7d01c53868bab09156495d0b2975df3e3700b938e79e2ab8d52f8367ed9367d9bfcfa9a736ada839dcd793139cf2ded8fe59ae6fab47f957dc747d62a7f33fbc6dc413db4ed0dc03e68fbd920f6f515b51e8fe20b0f3bec575342772ab082629bfe5c83db2074fa9ac19ae25b8937cd2348d8c658e7daac7f6a5f118377311d305c91dfb7e26b69c64e291945abdcd369bc5083e6d5350c02a3fe3ec9ebd3f8aa407c55bd95b53d415d7aa9bb3ebdf9e07bd652ea57aa062ea518000f9ba01c81f4a94eaf7cf108dae1fef6e2f9f98fe359fb2f245f3beec75e5adf444cf7bb8bb904bbbee2d9cf3d4939c1a82dad1ef2ee28233879582a9278c9e94f96fee67b65b79642e81b70dc493dc7f5a8a295e195658d8a48a72187506aed78d993b3d0b4347bc286455dca0f5120f7ec79ec7f2345ce97716900966dca090a06ece7393fd298ba85da9c8b8917e871fe7a9fce89af2e2e47efa67939cfcc7a7f9cd4286baa45df4221802a549ae421863b89963738312b9c3678e99c54429e8ccac1949041c8c55b49e8c94cd69f4cd6a29846f34ecd11f90998e1781c8c9cf008e78aad70baad9b79b35cdca3bf1bfce24b63b120e714e8b58bf851156e188462c371c9c9183fa74a825bbb8b850b34ef20072031ce0fad64a0efaa34b985ac0ccd164e4e0f27bf3573c18bff158697ff5f09ffa10aadaa8fdf47fee9abde0d0078bf4bcff00cfc27fe842bccc47f159d74be03e83f020c586a5ff005f8fff00a08af08f1e101a0181fea8e7fefa6af79f028ff41d4bfebf1bff00415af9f7c733169d467a6f5fc9ab3eacaec79f8ff5e71eb5787dd159e0fef8e7d6aea9e3a7e949143d4e3de90f4393dba520c7e9e9413edf8e2980673f97b53718f5edd852e3bf53f4a31c9e3f4a003fcf6a51f43fa520e9ff00eaa38ff228017f127f2a5ec3271f9518c76fd28e41f5fc0500281d39fc78a77a724fe5498e993fa0a503918fe5400e03dcfe940e8383fa50bc01c7af6a5dbc019fd2800c71d727f0a7019efc7e146060751f80a5007a1fc850018c7f914b8e3a9cfa714bfe7a0a5c0edc1fa500201d724fe94a471f88f4a3039e33f85213f4ea3b5004327de1924fe35b3a5fdf41fed0fe62b19cfcc0d6be92d89a23db7aff003142dc19f4f780ceef0ca1ff00a6adfd2ba715ca7c3c6dde148cff00d357fe95d58a97b896c1451452185145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140057837c4c4cddf8c233ff003ca093ff0045d7bc9af11f8936b249e2ad76d547379a40923f72833ffb2538899f3854e979711a85595c01d306a0c628a149ad81a4f72c7dbeebfe7b3fe74efb7dd7fcf77fceaad2d57b49f762e48f62cfdbeeff00e7bbfe74bf6fbaff009ef27e75585147b49f761c91ec591a85dffcfc3fe74bf6fbbff9eeff00f7d555a70a3da4fbb0e48f62d2dfddff00cfc49ff7d5385fddff00cfc49ff7d5578a3791b6c68cc7d1466af47a46a52fdcd3eedbe90b1fe947b49f761c91ec305f5d9ff97893fefaa78bdbaff9f893f3ab09e1dd688c8d22fbff0001dffc29ff00f08feb2bf7b49be1ff006c1ffc28f693ee1c91ec40b7975ff3de4ffbeaa417973ff3de4ffbea91f4fbd8013359dc460752f191fd2a3039a3da4fb872aec595bab8ff009ef27fdf5522dcce7fe5b3fe755d454ca28f692ee1cb1ec4eb713ffcf693f335209e73ff002d5ffefa350a8a95451cf2ee1cabb1209a6ff9eb27fdf469e2597fe7abff00df46980548ab4b9e5dc7ca86f2c72c493ea6b73c1d1eef176963fe9e13ff0042ac8db5d37812dc4be2bb695880b6eaf337fc0549fe74aedbd43647b9780ceed2af9fd6fa4fe4b5f3978e1cfdb9c1e825997f2615f467c3b8d8784d27718fb44f2ca3e85b03f957817c4bb27b6d6352403e58af1ff00c7ffd9aaeac479b83fbc26ada37cbd7f4aa3d1ea747a928b208a5c13c1f4f4a843e45383714c093ae303f4a08ff0038a6823dba51919e31f95003bb9e3b7a52803d3f4a6e473d0fe14a38ff00f5500281cf43f952e3f9fa51f2f603a7a5181c719fc280003a71dfd29f8e99f4f4a68038ff000a50071851f91a00907d3d7b528038e3f4a45c63a7aff0d2e78ffeb5002819038ede94e0bd38ff00c76983181f2fe94fe0761f95002e3ebf95388ee467f0a6ee1e9c7d282e39c0fd280149e0fd7d29848fa534b839a616a0046396ad5d28eeb8894ff797f9d63e7915aba446d25cae09017927f0ff00ebd0b7067d43f0e548f05da31fe3676ffc788fe95d60ae7fc1101b7f0669719182610c7f1e7fad74149ee24145145218514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514001af2ff008b162d6973a4789141315b3fd9ae80ff009e6e783f9e47fc0abd42a96ada65beb3a4dce9d769ba0b88cc6e31ebdc7b8eb4d3b01f1278874a9346d6ee6cdc10aafba363cee43cab7e2306b2abd4bc59e15bd7965d12f23c6b3a72936ee4f17507518f52074fc47a5797ba323b2b82187507b50f410daddf09d95adfeb7e55ec465812de699a30db77148d9864fd456155ab2beb9d3e6335aca6390c6d1923fbacb823f104d219d7db43a45cdb4738d134e40ea1b6b5d5ce47e4a7f43599ae41a7b692b7169a7c7692c576d6ec6395dd5c6d0dc6ee475f6ac78b58d4a18d638b51bb48d46155676007d0678a64b7d733c0619677910c8653bce497c6324f52714015ead69f6bf6dd420b6ced1238527d077fd2aad58b2b93697b0dc28cf94e1b1ea2803a6bdf16dee9972d65a0c834fb480ec530a8dee475666c64d547f1a789dfef6bda863febbb0ab977e15bbd66e8dff87a1fb65a5cfef0223a878d8f55604f639c1a85bc05e2c8c73a0deffc0533fca802b7fc251afb1c9d6f503ff6f2ff00e352a78abc40bf775bd43ff021ff00c69c3c19e265e0e85a87fdf86a963f057899beee857ff8c245003d7c67e24dbb4eb578ea78c3c8587e46a6ba9adf57d15aede28e2bfb77557f2d768954f4623b1e3b7b52c7e02f13b7ded2258c7ac8ca98fccd3b51b7b7d0f4c6d2c4d1dc5fcce1ee1a23948c0ce141efd492680311454aa2a24a996803a2d19fc36ba7dc0d4e1bc7bc2a7cb28c36e7dbd0fd688ecf4dbe8a7165f6b8a78a233626656560bd7918c1c550d3f539ac11d628eddc3904f9d0ac9fcc7156e7d72f2ead9edc88228df1bc430247bbea54500505152814d51cd3c0a0000aebbc390b59687777cab9bbbc75b2b44f52c46e23ff001d1f89ac4d1f499756bd10ab08e2037cb2b7dd8d07527fc3d6bd67c03a1c5ab6a50eb0b194d274d061d3d187fad7fe294faf24f3ea7d8552ee267a4e95629a6693696318016de158f8ef818cff005af23f8b1e1f56d64cc0158f5084e4e3f8d78ffe24d7b476ac1f16f87c78874578130b7511f36ddcf671d8fb1e94a2ecc19f18dddb496d7324522ed742548fa5440e2bd23c49e173a8096786231dfc2764d09e0922bcfe5b578a428ea55875069b5604ee440d3f34cd8c3b52e0d031d9a7034c14e1400e069c08a6528a007e7da97d29b4a2801e0ff3a5cfbf4a6814a01a00783c60519181498a5c5003bebd294134dc7d69d8a0028cd2e28c73400da43526c27b5385bb1ed4015d54b30aed7c29a15c5ddcc3084c4d7322a27a8cff00fac9aaba0f86de76177723640873cf1935edbf0e3c3a771d6ee612ab82b68addc1eaff008f41f8d52d15c96efa23d0ed2dd6d2d21b741f2448a83e8062a6a28acca0a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a280398f187836cfc5b60ab2335bdf40775add463e689bfaa9ee2bc0bc5de0d9e1bb68bc4501b0bd2c426ab1a16b7b9f77c743ef8cfa8ef5f52543716d05ddbbc3710c7342e30d1c8a19587a106803e23bff0a6af65993eca6e20e713dbfef108f5c8cfebcd63323293b948c70722bebad43e13e8cd70d73a2ddde68b38e7fd11f319ff00801fe98af3bf16e873e85337dbe7b1d5827399ec155cff00c083669d847840a5af40493c3fa9c83cef0e450b9e375b5c3a73eb83915a767f0fb45d51818daee007b1915f1ff8e8a7cac67960a70af56bdf83f6d10dd16b1281e8d003ff00b35625c7c3a4b7ff00989b37fdb003ff0066a5cac0e223768db723956f5538ab91ea9a820f92fee97e9330feb5a775e1916c38bbddff006cff00faf596f6453fe5a67fe03ffd7a2c0585d6f55ffa0a5eff00dff6ff001a77f6bea4ff007b51bb3ff6d9bfc6aa0831fc5fa53d62ce3e6fd28b01335cdc4bfeb2795ffde72685ab16961f697c19768ff7735d059f8492e003f6c2bff6cfff00af4580e716a65aeef4ff0086697726d3aab28ffae19ffd9ab626f85d6169182f7d3c9feea85ff1a3958ae799ad4cbc9e2baf9f48d0f4d1892c6e6e0ffb572147e899fd69965ac69b7337d96dfc3d630e0e03cacf37e84e29f281ce5bdb4f712f970c2f23ff007554927f0adeb7f0e1b7224d62e16c933f2c27e69a43e8b18e73f5c7e35ea1a2782efb55d3c31d7cd95b3fde86c2d161c8f42727f9575fa1f82341d0a459ed6cc49760737539f3243f89e9f852d101c1786bc1179ad22a5cd949a4f87836e36cfc5c5e63a173d547b71e800af5ab6b686ceda3b7b7896286250a88a30140ed5374c52d0d8c28a28a40717e2ef05ff6a336a5a5620d517ef67eece0766f7f7ff23c8f57d06cafa76b7d4ed5f4cd457a965c06f7c7a7d2be90acdd5b45d3759b75b7d46d23b84cfca5872a7d41ea2a948563e5abef01ea50316b741751750d11cfff005eb127d12eedce26b5953ea8457d03ac7c3b5d2a27b8d3358b98501c88a44de07d0e47eb5c2cfe24bfb2b8fb3ca63b85c7f1ae2ab464dd9e5ad6454e0a907dc534d9e2bd522d5ecaf706e346b4627d063fa55a4d1f42bde4e92b19f58e4228e51f323c83ec8d47d91bd2bd91bc0ba2dc81b5278fe926693fe15a69983b6eee07e00d1c8c773c745abfa502d9fd2bd725f8616a0fcba94a3eb103fd6ab3fc38897a6a4ff8c23fc697285cf2e16cfe94f16cf9e95e963e1ec7ff004116ff00bf23fc6a78fe1bc4dff31361ff006c07f8d1ca173cbc5ab9ed4f166de95eaf1fc33b738dda9cbf844a3fad4cbf0dac0e375f5cfe01453e50b9e4a2cdbd29eb647d2bd70f81b47b41f38b89beb263fa5432e95a2597234a5908ef24a4d3e562e64796ad8e4e315661d22698e2282473feca135ddc9ad5a5a31fb3e8d6887d7ad469e2bd4269841108a053d36274a3942e73f69e0dd52e083f646890ff0014bf28fd79adab6f0f693a510d7938bbb8cfcb043cf3fd6bb7d1fc1173e218bcfbfd7ae3cb27fd5c7101fa927f95777a2f83f44d00abda59ab4fff003de5f99ff33d3f0a5748356719e1bf055deab24779ad406d6c50feeecba17f4dc3b0f6af4f48d63454450a8a30140c014eed4b50ddc695828a28a430a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2803ffd9');
SELECT pg_catalog.lo_close(0);

COMMIT;

SET search_path = administracion, pg_catalog;

--
-- TOC entry 2117 (class 2606 OID 96918)
-- Name: Modulos_pkey; Type: CONSTRAINT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY modulos
    ADD CONSTRAINT "Modulos_pkey" PRIMARY KEY (modulo);


--
-- TOC entry 2131 (class 2606 OID 96920)
-- Name: id; Type: CONSTRAINT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY usuarios_x_roles
    ADD CONSTRAINT id PRIMARY KEY (id);


--
-- TOC entry 2115 (class 2606 OID 96922)
-- Name: interaccion_x_recursos_pkey; Type: CONSTRAINT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY interacciones_x_recursos
    ADD CONSTRAINT interaccion_x_recursos_pkey PRIMARY KEY (recurso, interaccion);


--
-- TOC entry 2113 (class 2606 OID 96924)
-- Name: interacciones_pkey; Type: CONSTRAINT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY interacciones
    ADD CONSTRAINT interacciones_pkey PRIMARY KEY (interaccion);


--
-- TOC entry 2119 (class 2606 OID 96926)
-- Name: recursos_pkey; Type: CONSTRAINT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY recursos
    ADD CONSTRAINT recursos_pkey PRIMARY KEY (recurso);


--
-- TOC entry 2121 (class 2606 OID 96928)
-- Name: recursos_url_key; Type: CONSTRAINT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY recursos
    ADD CONSTRAINT recursos_url_key UNIQUE (url);


--
-- TOC entry 2123 (class 2606 OID 96930)
-- Name: roles_pkey; Type: CONSTRAINT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (rol);


--
-- TOC entry 2125 (class 2606 OID 96932)
-- Name: roles_x_interacciones_pkey; Type: CONSTRAINT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY roles_x_interacciones
    ADD CONSTRAINT roles_x_interacciones_pkey PRIMARY KEY (id);


--
-- TOC entry 2127 (class 2606 OID 96934)
-- Name: roles_x_interacciones_rol_interaccion_key; Type: CONSTRAINT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY roles_x_interacciones
    ADD CONSTRAINT roles_x_interacciones_rol_interaccion_key UNIQUE (rol, interaccion);


--
-- TOC entry 2129 (class 2606 OID 96936)
-- Name: usuarios_pkey; Type: CONSTRAINT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (usuario);


--
-- TOC entry 2133 (class 2606 OID 96938)
-- Name: usuarios_x_roles_usuario_rol_key; Type: CONSTRAINT; Schema: administracion; Owner: postgres
--

ALTER TABLE ONLY usuarios_x_roles
    ADD CONSTRAINT usuarios_x_roles_usuario_rol_key UNIQUE (usuario, rol);


SET search_path = aplicacion, pg_catalog;

--
-- TOC entry 2135 (class 2606 OID 96940)
-- Name: Clientes_pkey; Type: CONSTRAINT; Schema: aplicacion; Owner: postgres
--

ALTER TABLE ONLY clientes
    ADD CONSTRAINT "Clientes_pkey" PRIMARY KEY (cliente);


--
-- TOC entry 2137 (class 2606 OID 96969)
-- Name: contadores_pkey; Type: CONSTRAINT; Schema: aplicacion; Owner: postgres
--

ALTER TABLE ONLY contadores
    ADD CONSTRAINT contadores_pkey PRIMARY KEY (contador);


--
-- TOC entry 2145 (class 2606 OID 97075)
-- Name: factura_compras_detalle_pkey; Type: CONSTRAINT; Schema: aplicacion; Owner: postgres
--

ALTER TABLE ONLY factura_compras_detalle
    ADD CONSTRAINT factura_compras_detalle_pkey PRIMARY KEY (compra_detalle);


--
-- TOC entry 2143 (class 2606 OID 97069)
-- Name: factura_compras_pkey; Type: CONSTRAINT; Schema: aplicacion; Owner: postgres
--

ALTER TABLE ONLY factura_compras
    ADD CONSTRAINT factura_compras_pkey PRIMARY KEY (factura);


--
-- TOC entry 2141 (class 2606 OID 97029)
-- Name: factura_ventas_detalle_pkey; Type: CONSTRAINT; Schema: aplicacion; Owner: postgres
--

ALTER TABLE ONLY factura_ventas_detalle
    ADD CONSTRAINT factura_ventas_detalle_pkey PRIMARY KEY (factura_detalle);


--
-- TOC entry 2139 (class 2606 OID 97012)
-- Name: factura_ventas_pkey; Type: CONSTRAINT; Schema: aplicacion; Owner: postgres
--

ALTER TABLE ONLY factura_ventas
    ADD CONSTRAINT factura_ventas_pkey PRIMARY KEY (factura);


--
-- TOC entry 2146 (class 2606 OID 97035)
-- Name: factura_ventas_detalle_factura_fkey; Type: FK CONSTRAINT; Schema: aplicacion; Owner: postgres
--

ALTER TABLE ONLY factura_ventas_detalle
    ADD CONSTRAINT factura_ventas_detalle_factura_fkey FOREIGN KEY (factura) REFERENCES factura_ventas(factura) ON DELETE CASCADE;


--
-- TOC entry 2296 (class 0 OID 0)
-- Dependencies: 9
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-03-09 17:27:03

--
-- PostgreSQL database dump complete
--

