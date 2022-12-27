const bootstrap = async () => {
  const action = await ActionFactory.create(OrchestratorModule);
  await action.execute();

  const logger = action.get(Logger);
  logger.info('Action completed');
};

bootstrap();
