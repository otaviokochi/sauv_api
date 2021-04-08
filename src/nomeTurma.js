const nomeTurma = (serie, turma) => {
  let nome;
  switch(parseInt(serie)) {
    case 1:
      nome = `Primeira série ${turma.toUpperCase()}`;
      break;
    case 2:
      nome = `Segunda série ${turma.toUpperCase()}`;
      break;
    case 3:
      nome = `Terceira série ${turma.toUpperCase()}`;
      break;
    case 4:
      nome = `Quarta série ${turma.toUpperCase()}`;
      break;
    case 5:
      nome = `Quinta série ${turma.toUpperCase()}`;
      break;
    case 6:
      nome = `Sexta série ${turma.toUpperCase()}`;
      break;
    case 7:
      nome = `Sétima série ${turma.toUpperCase()}`;
      console.log('entro aqui')
      break;
    case 8:
      nome = `Oitava série ${turma.toUpperCase()}`;
      break;
    case 9:
      nome = `Nona série ${turma.toUpperCase()}`;
      break;            
  }
  return nome;
}

module.exports = {
  nomeTurma
}