# Sprint 3 Review

## Data: 19/06

## O que foi feito

### Histórias planejadas e Status

Histórias cujo símbolo estão em **negrito** são aquelas planejadas para essa sprint.

Histórias cujo símbolo estão em *itálico* são aquelas planejadas para sprints anteriores mas não foram finalizadas. 

| História | Descrição | Status |
| -------- | --------- | ---------- |
|   H1     | Como usuário, quero conectar-me utilizando minha conta criada durante o cadastro para ter acesso aos serviços oferecidos pelo UniJobs. | DONE |
| *H6*     | Como usuário, quero poder criar uma solicitação para informar à comunidade sobre meu interesse em um serviço. | Faltou Integrar com Back |
| H3       | Como usuário, quero ter acesso às últimas solicitações criadas para poder consultá-las. | DONE |
| *H14*    | Como usuário, quero ter acesso a todas minhas solicitações criadas para poder consultá-las. | Problema com o card |
| *H7*     | Como universitário, quero poder criar uma oferta para oferecer um serviço que estou disposto a realizar. | Faltou integrar com o back |
| **H4**   | Como usuário, quero poder buscar por ofertas e solicitações criadas pela comunidade, filtrando-as por categoria, para achar aquelas de meu interesse. | Faltou parte de Oferta e implementação da tela|
|  **H2**  | Como usuário, quero ter acesso às últimas ofertas criadas para poder consultá-las. | Faltou integração com Back | 
| **H8**   |  Como universitário, quero ter acesso a todas minhas ofertas criadas para poder consultá-las. | Faltou integração com Back |

### Tasks de sprints anteriores que ficaram para essa Sprint

### Front-end
- Faltou scroll de categorias na criação de Solicitação **FEITO**
- Faltou criação de ofertas **FEITO**
- Falta integração do cartão no histórico de solicitações **FEITO**
- Faltou paginação no Feed de solicitações NÃO FEITO

### Back-end
- Criação de Oferta **FEITO**

## O que deu certo?

### Front-end
- Adaptação Solicitação -> Oferta: Histórico e Feed
- Consertou problema com sombra no Android
- Botão de criar solicitação/oferta está funcionando!
- Adaptar cartão de solicitação -> oferta está pronto!
- Terminou desenho da tela de busca! 
- Fez mudanças no XD pedidas pelo cliente

### Back-end
- Criação de oferta feita. Adaptação do ID para UUID para uso com ES está funcionando!
- Conseguiu fluir melhor na navegação do código
- Subiu ES
- Documentação da Arquitetura feita
- Integração de ES com Posgtres para busca de solicitações está funcionando!
- API para busca textual de solicitações está pronta.

## O que faltou ser feito?

### Front-end
- Falta popular cartão de oferta para Feed/Histórico
- Integração das telas de adicionar oferta/solicitação com botão de adicionar
- Integrar criação de solicitação/oferta para o back

### Backend-end
- Estender busca textual para Ofertas

## O que deu errado?

### Front-end
- Não entender o que era exatamente Histórico de Solicitações. 
- Relacionar entidades do projeto com classes do código
- Muitas classes no código para navegar facilmente


## Sugestões de melhorias

### Front-end
- Fazer documento explicando entidades envolvidas na plataforma. O que é solicitação, o que é oferta, o que é interesse.
- UML relacionando classes


## Mudanças nas Histórias de Usuário orginais:

- **H4**: Não será feita paginação na busca
