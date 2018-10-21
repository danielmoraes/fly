import { get, has } from 'lodash'
import moment from 'moment'

const prefix = 'ControlGroupSearch$SearchMainSearchView$'

export const airports = {
  'aax': 'Araxá (AAX)',
  'aju': 'Aracaju (AJU)',
  'aru': 'Araçatuba (ARU)',
  'atm': 'Altamira (ATM)',
  'bel': 'Belém (BEL)',
  'bpg': 'Barra do Garças (BPG)',
  'bps': 'Porto Seguro (BPS)',
  'bra': 'Barreiras (BRA)',
  'bsb': 'Brasília (BSB)',
  'bvb': 'Boa Vista (BVB)',
  'bvh': 'Vilhena (BVH)',
  'byo': 'Bonito (BYO)',
  'cac': 'Cascavel (CAC)',
  'caw': 'Campos dos Goytacazes (CAW)',
  'cfb': 'Cabo Frio (CFB)',
  'cgb': 'Cuiabá (CGB)',
  'cgh': 'São Paulo - Congonhas (CGH)',
  'cgr': 'Campo Grande (CGR)',
  'cks': 'Carajás (CKS)',
  'clv': 'Caldas Novas (CLV)',
  'cmg': 'Corumbá (CMG)',
  'cnf': 'Belo Horizonte - Confins (CNF)',
  'cpv': 'Campina Grande (CPV)',
  'cwb': 'Curitiba (CWB)',
  'cxj': 'Caxias do Sul (CXJ)',
  'diq': 'Divinópolis (DIQ)',
  'dou': 'Dourados (DOU)',
  'fec': 'Feira de Santana (FEC)',
  'fen': 'Fernando de Noronha (FEN)',
  'fln': 'Florianópolis (FLN)',
  'for': 'Fortaleza (FOR)',
  'gel': 'Santo Ângelo (GEL)',
  'gig': 'Rio De Janeiro - Galeão (GIG)',
  'gru': 'São Paulo - Guarulhos (GRU)',
  'gvr': 'Governador Valadares (GVR)',
  'gyn': 'Goiânia (GYN)',
  'igu': 'Foz do Iguaçu (IGU)',
  'imp': 'Imperatriz (IMP)',
  'ios': 'Ilhéus (IOS)',
  'ipn': 'Ipatinga (IPN)',
  'iza': 'Juiz de Fora - Zona da Mata (IZA)',
  'jdo': 'Juazeiro do Norte (JDO)',
  'jjd': 'Jericoacoara (JJD)',
  'jjg': 'Jaguaruna/Criciúma (JJG)',
  'joi': 'Joinville (JOI)',
  'jpa': 'João Pessoa (JPA)',
  'jpr': 'Ji-Paraná (JPR)',
  'jtc': 'Bauru - Arealva (JTC)',
  'laj': 'Lages (LAJ)',
  'ldb': 'Londrina (LDB)',
  'lec': 'Lencóis - Chapada Diamantina (LEC)',
  'mab': 'Marabá (MAB)',
  'mao': 'Manaus (MAO)',
  'mcp': 'Macapá (MCP)',
  'mcz': 'Maceió (MCZ)',
  'mgf': 'Maringá (MGF)',
  'mii': 'Marília (MII)',
  'moc': 'Montes Claros (MOC)',
  'mvf': 'Mossoro (MVF)',
  'nat': 'Natal (NAT)',
  'nbc': 'Balneário Camboriú (NVT)',
  'nbl': 'Blumenau (NVT)',
  'nbp': 'Balneário Piçarras (NVT)',
  'nbr': 'Brusque (NVT)',
  'nbv': 'Barra Velha (NVT)',
  'nca': 'Camboriú (NVT)',
  'nga': 'Gaspar (NVT)',
  'ngu': 'Guabiruba (NVT)',
  'nil': 'Ilhota (NVT)',
  'nip': 'Itapema (NVT)',
  'nit': 'Itajaí (NVT)',
  'nla': 'Luiz Alves (NVT)',
  'nna': 'Navegantes (NVT)',
  'npb': 'Porto Belo (NVT)',
  'npe': 'Penha (NVT)',
  'npo': 'Pomerode (NVT)',
  'nti': 'Timbó (NVT)',
  'oal': 'Cacoal (OAL)',
  'ops': 'Sinop (OPS)',
  'pav': 'Paulo Afonso (PAV)',
  'pet': 'Pelotas (PET)',
  'pfb': 'Passo Fundo (PFB)',
  'pgz': 'Ponta Grossa (PGZ)',
  'phb': 'Parnaiba (PHB)',
  'pin': 'Parintins (PIN)',
  'pmw': 'Palmas (PMW)',
  'pnz': 'Petrolina (PNZ)',
  'poa': 'Porto Alegre (POA)',
  'ppb': 'Presidente Prudente (PPB)',
  'pvh': 'Porto Velho (PVH)',
  'rao': 'Ribeirão Preto (RAO)',
  'rec': 'Recife (REC)',
  'ria': 'Santa Maria (RIA)',
  'roo': 'Rondonópolis (ROO)',
  'rvd': 'Rio Verde (RVD)',
  'saa': 'Salvador (SSA)',
  'sdu': 'Rio de Janeiro - Santos Dumont (SDU)',
  'sjk': 'São José dos Campos (SJK)',
  'sjp': 'São José do Rio Preto (SJP)',
  'slz': 'São Luís (SLZ)',
  'smt': 'Sorriso (SMT)',
  'stm': 'Santarém (STM)',
  'tbt': 'Tabatinga (TBT)',
  'tff': 'Tefé (TFF)',
  'the': 'Teresina (THE)',
  'tjl': 'Três Lagoas (TJL)',
  'txf': 'Teixeira de Freitas (TXF)',
  'uba': 'Uberaba (UBA)',
  'udi': 'Uberlândia (UDI)',
  'urg': 'Uruguaiana (URG)',
  'vag': 'Varginha (VAG)',
  'val': 'Valença - Morro de São Paulo (VAL)',
  'vcp': 'São Paulo - Viracopos (VCP)',
  'vdc': 'Vitória da Conquista (VDC)',
  'vix': 'Vitória (VIX)',
  'xap': 'Chapecó (XAP)'
}

export const cities = {
  'bhz': 'Belo Horizonte - Todos os Aeroportos (BHZ)',
  'rio': 'Rio de Janeiro - Todos os Aeroportos (RIO)',
  'sao': 'São Paulo - Todos os Aeroportos (SAO)'
}

export const FareType = {
  'Cash': 'R',
  'Points': 'TD',
  'CashAndPoints': 'TP'
}

export const TripType = {
  'OneWay': 'OneWay',
  'RoundTrip': 'RoundTrip',
  'OpenJaw': 'OpenJaw'
}

const getAirport = code => {
  if (has(airports, code)) {
    return { name: airports[code], isCity: false }
  } else if (has(cities, code)) {
    return { name: cities[code], isCity: true }
  } else {
    throw Error('Invalid code')
  }
}

export const getData = (originCode, destinationCode, date, options) => {
  const origin = getAirport(originCode)
  const destination = getAirport(destinationCode)

  if (!date) {
    throw Error('Missing departure date')
  }

  const fareType = FareType[get(options, 'fareType', 'Cash')]
  const tripType = TripType[get(options, 'tripType', 'OneWay')]

  const adults = '' + get(options, 'adults', 1)
  const children = '' + get(options, 'children', 0)
  const infants = '' + get(options, 'infant', 0)

  return {
    '__EVENTTARGET': 'ControlGroupSearch$LinkButtonSubmit',
    [`${prefix}RadioButtonMarketStructure`]: tripType,
    [`${prefix}TextBoxMarketOrigin1`]: origin.name,
    [`${prefix}CheckBoxUseMacOrigin1`]: origin.isCity ? 'on' : '',
    [`${prefix}TextBoxMarketDestination1`]: destination.name,
    [`${prefix}CheckBoxUseMacDestination1`]: destination.isCity ? 'on' : '',
    [`${prefix}DropDownListMarketDay1`]: moment(date).format('DD'),
    [`${prefix}DropDownListMarketMonth1`]: moment(date).format('YYYY-MM'),
    [`${prefix}DropDownListPassengerType_ADT`]: adults,
    [`${prefix}DropDownListPassengerType_CHD`]: children,
    [`${prefix}DropDownListPassengerType_INFANT`]: infants,
    [`${prefix}DropDownListFareTypes`]: fareType
  }
}
