const StatusEnum = { available: 1, unnavailable: 2, test: 3 };
const states = [
  {
    id: 11,
    name: "Rondônia",
    abbr: "RO",
    status: StatusEnum.unnavailable
  },
  {
    id: 12,
    name: "Acre",
    abbr: "AC",
    status: StatusEnum.unnavailable
  },
  {
    id: 13,
    name: "Amazonas",
    abbr: "AM",
    status: StatusEnum.unnavailable
  },
  {
    id: 14,
    name: "Roraima",
    abbr: "RR",
    status: StatusEnum.unnavailable
  },
  {
    id: 15,
    name: "Pará",
    abbr: "PA",
    status: StatusEnum.unnavailable
  },
  {
    id: 16,
    name: "Amapá",
    abbr: "AP",
    status: StatusEnum.unnavailable
  },
  {
    id: 17,
    name: "Tocantins",
    abbr: "TO",
    status: StatusEnum.unnavailable
  },
  {
    id: 21,
    name: "Maranhão",
    abbr: "MA",
    status: StatusEnum.unnavailable
  },
  {
    id: 22,
    name: "Piauí",
    abbr: "PI",
    status: StatusEnum.unnavailable
  },
  {
    id: 23,
    name: "Ceará",
    abbr: "CE",
    status: StatusEnum.unnavailable
  },
  {
    id: 24,
    name: "Rio Grande do Norte",
    abbr: "RN",
    status: StatusEnum.unnavailable
  },
  {
    id: 25,
    name: "Paraíba",
    abbr: "PB",
    status: StatusEnum.unnavailable
  },
  {
    id: 26,
    name: "Pernambuco",
    abbr: "PE",
    status: StatusEnum.unnavailable
  },
  {
    id: 27,
    name: "Alagoas",
    abbr: "AL",
    status: StatusEnum.unnavailable
  },
  {
    id: 28,
    name: "Sergipe",
    abbr: "SE",
    status: StatusEnum.unnavailable
  },
  {
    id: 29,
    name: "Bahia",
    abbr: "BA",
    status: StatusEnum.unnavailable
  },
  {
    id: 31,
    name: "Minas Gerais",
    abbr: "MG",
    status: StatusEnum.unnavailable
  },
  {
    id: 32,
    name: "Espírito Santo",
    abbr: "ES",
    status: StatusEnum.unnavailable
  },
  {
    id: 33,
    name: "Rio de Janeiro",
    abbr: "RJ",
    status: StatusEnum.unnavailable
  },
  {
    id: 35,
    name: "São Paulo",
    abbr: "SP",
    status: StatusEnum.unnavailable
  },
  {
    id: 41,
    name: "Paraná",
    abbr: "PR",
    status: StatusEnum.available
  },
  {
    id: 42,
    name: "Santa Catarina",
    abbr: "SC",
    status: StatusEnum.unnavailable
  },
  {
    id: 43,
    name: "Rio Grande do Sul",
    abbr: "RS",
    status: StatusEnum.unnavailable
  },
  {
    id: 50,
    name: "Mato Grosso do Sul",
    abbr: "MS",
    status: StatusEnum.unnavailable
  },
  {
    id: 51,
    name: "Mato Grosso",
    abbr: "MT",
    status: StatusEnum.unnavailable
  },
  {
    id: 52,
    name: "Goiás",
    abbr: "GO",
    status: StatusEnum.unnavailable
  },
  {
    id: 53,
    name: "Distrito Federal",
    abbr: "DF",
    status: StatusEnum.unnavailable
  }
];

const counties = [
  {
    id: 4104303,
    state_id: 41,
    name: "Campo Mourão"
  },
  {
    id: 2901155,
    state_id: 29,
    name: "América Dourada"
  },
  {
    id: 5208707,
    state_id: 52,
    name: "Goiânia"
  },
  {
    id: 4101705,
    state_id: 41,
    name: "Araruna"
  },
  {
    id: 2927408,
    state_id: 29,
    name: "Salvador"
  }
];

const schools = [
  {
    id: 1234,
    county_id: 4104303,
    name: "Escola Municipal Parigot de Souza"
  },
  {
    id: 1235,
    county_id: 4104303,
    name: "CMEI Amor Perfeito"
  },
  {
    id: 1236,
    county_id: 2901155,
    name: "Grupo Escolar Doze de Outubro"
  },
  {
    id: 1237,
    county_id: 2901155,
    name: "Escola Municipal Elizete Seixas Dourado"
  }
];

export default { states, counties, schools };
