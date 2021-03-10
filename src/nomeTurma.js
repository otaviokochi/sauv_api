module.exports = function nomeTurma(serie, turma) {
  let nome;
  switch(parseInt(serie)) {
    case 1:
      nome = `Primeira série ${turma}`;
      break;
    case 2:
      nome = `Segunda série ${turma}`;
      break;
    case 3:
      nome = `Terceira série ${turma}`;
      break;
    case 4:
      nome = `Quarta série ${turma}`;
      break;
    case 5:
      nome = `Quinta série ${turma}`;
      break;
    case 6:
      nome = `Sexta série ${turma}`;
      break;
    case 7:
      nome = `Sétima série ${turma}`;
      console.log('entro aqui')
      break;
    case 8:
      nome = `Oitava série ${turma}`;
      break;
    case 9:
      nome = `Nona série ${turma}`;
      break;            
  }
  return nome;
}