const states = [
  {
    id: 41,
    name: "Paraná",
    abbr: "PR"
  },
  {
    id: 29,
    name: "Bahia",
    abbr: "BA"
  },
  {
    id: 52,
    name: "Goiás",
    abbr: "GO"
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
