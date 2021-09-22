const utils = require("./utils");
utils.deleteFolderRecursive("build", true);

utils.copyFolderRecursiveSync("assets/", "build/assets");