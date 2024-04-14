var logger = Packages.org.slf4j.LoggerFactory.getLogger("aidava-tagger"),
    refineServlet = Packages.com.google.refine.RefineServlet,
    operationRegistry = Packages.com.google.refine.operations.OperationRegistry;

function init() {
    logger.info("NLP-extension initializing");

    try {
        refineServlet.registerCommand(
            module,
            "tag-nlp",
            new Packages.org.aidava.openrefine.extension.tagger.commands.NLPTaggerCommand());
        refineServlet.registerCommand(
            module,
            "tag-entity-linking",
            new Packages.org.aidava.openrefine.extension.tagger.commands.EntityLinkingTaggerCommand()
        );
        operationRegistry.registerOperation(
            module,
            "tag-nlp-operation",
            Packages.org.aidava.openrefine.extension.tagger.operations.NLPTaggerOperation
        );
        operationRegistry.registerOperation(
            module,
            "tag-entity-linking-operation",
            Packages.org.aidava.openrefine.extension.tagger.operations.EntityLinkingTaggerOperation
        );

        logger.info("NLP-extension initialized");
        logger.info("NLP-extension initializing client side resources");

        var resourceManager =
            new Packages.com.google.refine.ClientSideResourceManager();

        resourceManager.addPaths("project/scripts", module, [
            // "scripts/config.js",
            // "scripts/util.js",
            "dialogs/nlp-tagger-dialog.js",
            "dialogs/entity-linking-tagger-dialog.js",
            "scripts/menus.js",
            "scripts/utils.js"
        ]);
        resourceManager.addPaths("project/styles", module, ["styles/main.less", "dialogs/tagger-dialog.less"]);
    } catch (e) {
        logger.error("Error initializing NLP-extension", e);
        logger.error(e);
    }
}
