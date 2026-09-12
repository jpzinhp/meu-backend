import type { SegmentId, ServiceItem } from '../types';

export interface SegmentCopy {
  taglines: string[];
  descriptions: string[];
  aboutBody: string[];
  services: ServiceItem[];
  differentiators: string[];
  ctaLabel: string;
}

const base = (data: SegmentCopy) => data;

export const SEGMENT_COPY: Record<SegmentId, SegmentCopy> = {
  restaurante: base({
    taglines: ['Sabores que contam histórias', 'Uma experiência gastronômica inesquecível'],
    descriptions: [
      'Um ambiente aconchegante e um cardápio pensado com carinho para cada visita ser especial.',
      'Ingredientes selecionados e receitas autorais servidos com atenção a cada detalhe.',
    ],
    aboutBody: [
      'Nascemos da paixão por reunir pessoas ao redor de uma boa mesa. Cada prato é preparado com ingredientes frescos e muito cuidado, em um ambiente pensado para receber bem.',
    ],
    services: [
      { name: 'Pratos principais', description: 'Opções variadas preparadas na hora, do tradicional ao autoral.' },
      { name: 'Entradas e petiscos', description: 'Perfeitos para compartilhar antes do prato principal.' },
      { name: 'Sobremesas da casa', description: 'Receitas próprias para fechar a refeição com chave de ouro.' },
      { name: 'Eventos e reservas', description: 'Espaço disponível para comemorações e grupos maiores.' },
    ],
    differentiators: ['Ingredientes selecionados', 'Ambiente climatizado e aconchegante', 'Atendimento atencioso'],
    ctaLabel: 'Reservar mesa',
  }),
  pizzaria: base({
    taglines: ['A pizza que todo mundo pede de novo', 'Massa artesanal, sabor de verdade'],
    descriptions: [
      'Pizzas assadas em forno tradicional, com massa de fermentação lenta e ingredientes selecionados.',
      'Receitas clássicas e criações especiais da casa, feitas para compartilhar.',
    ],
    aboutBody: [
      'Fazemos pizza como manda a tradição: massa de fermentação lenta, molho preparado na casa e ingredientes de qualidade, do jeito que todo amante de pizza merece.',
    ],
    services: [
      { name: 'Pizzas tradicionais', description: 'Os sabores clássicos que nunca saem de moda.' },
      { name: 'Pizzas especiais da casa', description: 'Combinações exclusivas criadas pelo nosso time.' },
      { name: 'Bordas recheadas', description: 'Catupiry, cheddar e outras opções para turbinar o pedido.' },
      { name: 'Delivery e retirada', description: 'Peça pelo WhatsApp e receba rapidinho em casa.' },
    ],
    differentiators: ['Forno tradicional', 'Massa de fermentação lenta', 'Delivery rápido'],
    ctaLabel: 'Fazer pedido',
  }),
  clinica: base({
    taglines: ['Cuidado profissional em cada etapa', 'Sua saúde em boas mãos'],
    descriptions: [
      'Atendimento humanizado com estrutura completa para cuidar de você em todas as fases.',
      'Profissionais qualificados e tecnologia a serviço do seu bem-estar.',
    ],
    aboutBody: [
      'Contamos com uma equipe qualificada e uma estrutura pensada para oferecer um atendimento próximo, seguro e humanizado em cada consulta.',
    ],
    services: [
      { name: 'Consultas especializadas', description: 'Atendimento individualizado conforme sua necessidade.' },
      { name: 'Exames e diagnósticos', description: 'Estrutura própria para agilizar seu tratamento.' },
      { name: 'Acompanhamento contínuo', description: 'Cuidado de longo prazo com foco em resultados.' },
      { name: 'Emergências e urgências', description: 'Suporte rápido quando você mais precisa.' },
    ],
    differentiators: ['Equipe qualificada', 'Estrutura moderna', 'Atendimento humanizado'],
    ctaLabel: 'Agendar consulta',
  }),
  academia: base({
    taglines: ['Sua evolução começa aqui', 'Treino de verdade, resultado de verdade'],
    descriptions: [
      'Estrutura completa, equipamentos modernos e uma equipe pronta para te ajudar a evoluir.',
      'Energia, acompanhamento profissional e resultados reais para todos os níveis.',
    ],
    aboutBody: [
      'Somos mais que uma academia: somos um time que acredita que cada evolução conta. Estrutura completa e profissionais preparados para te acompanhar em cada treino.',
    ],
    services: [
      { name: 'Musculação', description: 'Equipamentos modernos para todos os níveis de treino.', price: 'A partir de R$ 89,90/mês' },
      { name: 'Aulas coletivas', description: 'Funcional, spinning, dança e muito mais.', price: 'Incluso no plano completo' },
      { name: 'Treino personalizado', description: 'Acompanhamento individual com profissional dedicado.', price: 'Sob consulta' },
      { name: 'Avaliação física', description: 'Diagnóstico completo para traçar seus objetivos.' },
    ],
    differentiators: ['Equipamentos modernos', 'Professores qualificados', 'Ambiente motivador'],
    ctaLabel: 'Matricule-se',
  }),
  'salao-beleza': base({
    taglines: ['Sua beleza, nossa especialidade', 'Realce sua beleza natural'],
    descriptions: [
      'Serviços completos de beleza em um ambiente pensado para o seu bem-estar.',
      'Profissionais especializados prontos para realçar o seu melhor.',
    ],
    aboutBody: [
      'Cuidamos de cada detalhe para que você saia daqui se sentindo ainda mais confiante. Profissionais especializados e produtos de qualidade em cada atendimento.',
    ],
    services: [
      { name: 'Cabelo', description: 'Corte, coloração, escova e tratamentos capilares.', price: 'A partir de R$ 60' },
      { name: 'Unhas', description: 'Manicure, pedicure e nail art.', price: 'A partir de R$ 40' },
      { name: 'Estética facial', description: 'Limpeza de pele e tratamentos faciais.', price: 'Sob consulta' },
      { name: 'Maquiagem', description: 'Produções para eventos e ocasiões especiais.' },
    ],
    differentiators: ['Profissionais especializados', 'Produtos de qualidade', 'Ambiente climatizado'],
    ctaLabel: 'Agendar horário',
  }),
  barbearia: base({
    taglines: ['Estilo e tradição em cada corte', 'O visual que você merece'],
    descriptions: [
      'Cortes modernos e clássicos, feitos por barbeiros experientes em um ambiente sofisticado.',
      'Tradição e cuidado no visual masculino, do corte à barba.',
    ],
    aboutBody: [
      'Combinamos tradição e estilo para entregar o corte perfeito. Ambiente sofisticado, barbeiros experientes e atenção a cada detalhe do visual.',
    ],
    services: [
      { name: 'Corte de cabelo', description: 'Cortes clássicos e modernos sob medida.', price: 'A partir de R$ 35' },
      { name: 'Barba', description: 'Modelagem e acabamento com navalha.', price: 'A partir de R$ 25' },
      { name: 'Combo corte + barba', description: 'O pacote completo com preço especial.', price: 'A partir de R$ 55' },
      { name: 'Sobrancelha', description: 'Design com navalha ou pinça.' },
    ],
    differentiators: ['Barbeiros experientes', 'Ambiente sofisticado', 'Produtos premium'],
    ctaLabel: 'Agendar horário',
  }),
  oficina: base({
    taglines: ['Seu carro em boas mãos', 'Confiança e qualidade em cada serviço'],
    descriptions: [
      'Serviços mecânicos completos com transparência e agilidade.',
      'Diagnóstico preciso e mão de obra especializada para o seu veículo.',
    ],
    aboutBody: [
      'Trabalhamos com transparência e agilidade para resolver o problema do seu veículo com qualidade, sem enrolação e com preço justo.',
    ],
    services: [
      { name: 'Revisão completa', description: 'Checagem geral para manter seu carro em dia.' },
      { name: 'Troca de óleo e filtros', description: 'Manutenção preventiva rápida.' },
      { name: 'Freios e suspensão', description: 'Segurança em primeiro lugar.' },
      { name: 'Diagnóstico eletrônico', description: 'Identificação precisa de problemas.' },
    ],
    differentiators: ['Orçamento sem compromisso', 'Peças de qualidade', 'Serviço garantido'],
    ctaLabel: 'Solicitar orçamento',
  }),
  loja: base({
    taglines: ['Tudo o que você precisa em um só lugar', 'Qualidade e variedade para você'],
    descriptions: [
      'Produtos selecionados com o melhor custo-benefício e atendimento próximo.',
      'Uma seleção pensada para atender você com qualidade e agilidade.',
    ],
    aboutBody: [
      'Buscamos sempre as melhores opções para oferecer produtos de qualidade com preços justos e atendimento próximo, do jeito que você merece.',
    ],
    services: [
      { name: 'Atendimento personalizado', description: 'Ajudamos você a encontrar o que precisa.' },
      { name: 'Produtos selecionados', description: 'Variedade com curadoria de qualidade.' },
      { name: 'Entrega e retirada', description: 'Facilidade para receber sua compra.' },
    ],
    differentiators: ['Melhor custo-benefício', 'Atendimento próximo', 'Novidades sempre'],
    ctaLabel: 'Fale conosco',
  }),
  imobiliaria: base({
    taglines: ['Encontre o imóvel dos seus sonhos', 'Realizando sonhos, um imóvel de cada vez'],
    descriptions: [
      'Consultoria completa para comprar, vender ou alugar com segurança.',
      'Anos de experiência no mercado imobiliário ao seu lado.',
    ],
    aboutBody: [
      'Ajudamos pessoas a encontrarem o lugar certo para viver ou investir, com consultoria transparente do início ao fim do processo.',
    ],
    services: [
      { name: 'Compra e venda', description: 'Consultoria completa em todas as etapas da negociação.' },
      { name: 'Locação', description: 'Encontramos o imóvel ideal para alugar.' },
      { name: 'Avaliação de imóveis', description: 'Análise de mercado para precificar corretamente.' },
      { name: 'Administração de imóveis', description: 'Gestão completa para proprietários.' },
    ],
    differentiators: ['Consultoria transparente', 'Ampla carteira de imóveis', 'Atendimento dedicado'],
    ctaLabel: 'Falar com corretor',
  }),
  hotel: base({
    taglines: ['Conforto que faz a diferença', 'Sua estadia perfeita começa aqui'],
    descriptions: [
      'Estrutura completa para hóspedes a lazer e negócios, com conforto em cada detalhe.',
      'Hospitalidade e conforto em um só lugar.',
    ],
    aboutBody: [
      'Oferecemos uma estadia confortável com estrutura completa, pensada tanto para viagens a trabalho quanto a lazer.',
    ],
    services: [
      { name: 'Acomodações', description: 'Quartos confortáveis para todos os perfis de viagem.' },
      { name: 'Café da manhã', description: 'Cardápio completo incluso na diária.' },
      { name: 'Eventos e reuniões', description: 'Espaço estruturado para grupos e negócios.' },
    ],
    differentiators: ['Localização privilegiada', 'Estrutura completa', 'Atendimento 24h'],
    ctaLabel: 'Fazer reserva',
  }),
  pousada: base({
    taglines: ['Paz e conforto para sua viagem', 'Um refúgio para descansar'],
    descriptions: [
      'Ambiente tranquilo e acolhedor para uma estadia inesquecível.',
      'O lugar perfeito para descansar e recarregar as energias.',
    ],
    aboutBody: [
      'Criamos um ambiente acolhedor para quem busca descanso de verdade, com atenção aos detalhes e muito carinho no atendimento.',
    ],
    services: [
      { name: 'Acomodações aconchegantes', description: 'Quartos confortáveis em meio à natureza.' },
      { name: 'Café da manhã regional', description: 'Sabores locais para começar bem o dia.' },
      { name: 'Áreas de lazer', description: 'Espaços para relaxar durante a estadia.' },
    ],
    differentiators: ['Ambiente tranquilo', 'Atendimento acolhedor', 'Localização privilegiada'],
    ctaLabel: 'Fazer reserva',
  }),
  construcao: base({
    taglines: ['Construindo com solidez e confiança', 'Do projeto à entrega, com qualidade'],
    descriptions: [
      'Experiência e qualidade em cada etapa da sua obra.',
      'Soluções completas em construção civil, do planejamento à execução.',
    ],
    aboutBody: [
      'Atuamos em todas as etapas da obra, com uma equipe experiente comprometida com prazo, qualidade e segurança.',
    ],
    services: [
      { name: 'Construção residencial', description: 'Projetos completos do zero até a entrega das chaves.' },
      { name: 'Reformas', description: 'Ampliações e reformas com qualidade garantida.' },
      { name: 'Projetos e consultoria', description: 'Planejamento técnico para sua obra.' },
    ],
    differentiators: ['Equipe experiente', 'Cumprimento de prazos', 'Materiais de qualidade'],
    ctaLabel: 'Solicitar orçamento',
  }),
  escritorio: base({
    taglines: ['Soluções sob medida para o seu negócio', 'Experiência a serviço dos seus resultados'],
    descriptions: [
      'Consultoria especializada para apoiar decisões importantes.',
      'Atendimento próximo com soluções personalizadas para cada cliente.',
    ],
    aboutBody: [
      'Combinamos experiência técnica e atendimento próximo para entregar soluções que realmente fazem diferença para nossos clientes.',
    ],
    services: [
      { name: 'Consultoria especializada', description: 'Análise e orientação sob medida para o seu caso.' },
      { name: 'Atendimento personalizado', description: 'Suporte próximo em cada etapa.' },
      { name: 'Gestão de processos', description: 'Acompanhamento contínuo dos resultados.' },
    ],
    differentiators: ['Equipe especializada', 'Atendimento próximo', 'Resultados comprovados'],
    ctaLabel: 'Agendar reunião',
  }),
  escola: base({
    taglines: ['Educação que transforma', 'Aprendizado com propósito'],
    descriptions: [
      'Ensino de qualidade em um ambiente acolhedor e estimulante.',
      'Formando pessoas preparadas para o futuro.',
    ],
    aboutBody: [
      'Acreditamos que a educação transforma vidas. Por isso investimos em uma estrutura acolhedora e em uma equipe pedagógica comprometida com cada aluno.',
    ],
    services: [
      { name: 'Ensino regular', description: 'Currículo completo com acompanhamento individual.' },
      { name: 'Atividades extracurriculares', description: 'Esporte, arte e cultura no dia a dia.' },
      { name: 'Cursos e oficinas', description: 'Aprendizado prático para todas as idades.' },
    ],
    differentiators: ['Equipe pedagógica qualificada', 'Estrutura completa', 'Ambiente acolhedor'],
    ctaLabel: 'Matricule-se',
  }),
  eventos: base({
    taglines: ['Momentos inesquecíveis, do jeito certo', 'Transformando ideias em celebrações'],
    descriptions: [
      'Planejamento completo para o seu evento ser perfeito do início ao fim.',
      'Cuidamos de cada detalhe para você aproveitar sua festa.',
    ],
    aboutBody: [
      'Cuidamos de cada detalhe da sua celebração, do planejamento à execução, para que você só precise aproveitar o momento.',
    ],
    services: [
      { name: 'Buffet completo', description: 'Cardápio personalizado para cada tipo de evento.' },
      { name: 'Decoração', description: 'Ambientação sob medida para a sua ocasião.' },
      { name: 'Cerimonial', description: 'Coordenação completa no dia do evento.' },
    ],
    differentiators: ['Planejamento completo', 'Equipe experiente', 'Atenção aos detalhes'],
    ctaLabel: 'Solicitar orçamento',
  }),
  outro: base({
    taglines: ['Qualidade e compromisso em cada atendimento', 'Feito para você'],
    descriptions: [
      'Serviços de qualidade com atendimento próximo e dedicado.',
      'Compromisso com resultados e satisfação do cliente.',
    ],
    aboutBody: [
      'Trabalhamos com dedicação para entregar sempre o melhor resultado, com atendimento próximo e comprometido.',
    ],
    services: [
      { name: 'Atendimento personalizado', description: 'Soluções sob medida para sua necessidade.' },
      { name: 'Qualidade garantida', description: 'Compromisso em cada etapa do serviço.' },
    ],
    differentiators: ['Atendimento dedicado', 'Compromisso com qualidade'],
    ctaLabel: 'Fale conosco',
  }),
};
