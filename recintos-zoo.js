export { RecintosZoo };
class RecintosZoo {
    constructor(numero, bioma, tamanhoTotal, animaisExistentes) {
      this.numero = numero;
      this.bioma = bioma;
      this.tamanhoTotal = tamanhoTotal;
      this.animaisExistentes = animaisExistentes; // Um array de objetos representando os animais existentes
    }
  
    calcularEspacoLivre() { // calcula o numero de espaco livres
      const espacoOcupado = this.animaisExistentes.reduce((total, animal) => total + animal.tamanho, 0);
      return this.tamanhoTotal - espacoOcupado;
    }
  
    temBiomaAdequado(bioma) { // verifica o bioma
      return this.bioma.includes(bioma);
    }
  
    podeAdicionarAnimal(animal) { // adciona o animal no bioma adequado
      if (animal.bioma && !this.temBiomaAdequado(animal.bioma)) {
        return false;
      }
  
      const espacoNecessario = animal.tamanho + (this.animaisExistentes.length > 0 ? 1 : 0);
      return this.calcularEspacoLivre() >= espacoNecessario;
    }
  }
  
  class Animal {
    constructor(nome, tamanho, bioma) {
      this.nome = nome;
      this.tamanho = tamanho;
      this.bioma = bioma;
    }
  }
  
  const recintos = [
    new RecintosZoo(1, 'savana', 10, [{ nome: 'macaco', tamanho: 1 }]),
    new RecintosZoo(2, 'floresta', 5, []),
    new RecintosZoo(3, 'savana e rio', 7, [{ nome: 'gazela', tamanho: 2 }]),
    new RecintosZoo(4, 'rio', 8, []),
    new RecintosZoo(5, 'savana', 9, [{ nome: 'leão', tamanho: 3 }]),
  ];
  
  const animais = {
    LEAO: new Animal('leão', 3, 'savana'),
    LEOPARDO: new Animal('leopardo', 2, 'savana'),
    CROCODILO: new Animal('crocodilo', 3, 'rio'),
    MACACO: new Animal('macaco', 1, 'savana'),
    GAZELA: new Animal('gazela', 2, 'savana'),
    HIPOPOTAMO: new Animal('hipopotamo', 4, 'savana')
  };
  
  function verificarRecintos(tipoAnimal, quantidade) {
    const animal = animais[tipoAnimal.toUpperCase()];
    if (!animal) {
      return "Animal inválido";
    }
    
    if (isNaN(quantidade) || quantidade <= 0) {
      return "Quantidade inválida";
    }
  
    const recintosViaveis = recintos.filter(recinto => {
      if (!recinto.podeAdicionarAnimal(animal)) {
        return false;
      }
  
      if (tipoAnimal.toUpperCase() === 'MACACO' && quantidade === 1 && recinto.animaisExistentes.length === 0) {
        return false;
      }
  
      const espacoNecessario = animal.tamanho * quantidade + (quantidade > 1 ? quantidade - 1 : 0);
      if (recinto.calcularEspacoLivre() < espacoNecessario) {
        return false;
      }
  
      if (tipoAnimal.toUpperCase() === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
        return false;
      }
  
      if (recinto.animaisExistentes.length > 0) {
        const temAnimalCarne = recinto.animaisExistentes.some(a => a.nome === 'leão' || a.nome === 'leopardo' || a.nome === 'crocodilo');
        if (temAnimalCarne && tipoAnimal.toUpperCase() !== 'HIPOPOTAMO') {
          return false;
        }
  
        const temOutrosMacacos = recinto.animaisExistentes.some(a => a.nome === 'macaco');
        if (tipoAnimal.toUpperCase() === 'MACACO' && !temOutrosMacacos) {
          return false;
        }
      }
  
      return true;
    }).map(recinto => `Recinto numero ${recinto.numero} (espaço livre: ${recinto.calcularEspacoLivre()} total: ${recinto.tamanhoTotal})`);
  
    if (recintosViaveis.length === 0) {
      return "Não há recinto viável";
    }
  
    return recintosViaveis;
  }

  console.log(verificarRecintos('CROCODILO', 1));
