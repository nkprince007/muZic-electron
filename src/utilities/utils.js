const utils = {

    removeUselessFolders: folders => {
        //duplicates removal
        const filteredFolders = folders.filter((elem, index) => 
             folders.indexOf(elem) === index
        );

        const foldersToBeRemoved = [];

        filteredFolders.forEach((folder, i) => filteredFolders.forEach((subFolder, j) => {
            if (subFolder.includes(folder) && i !== j && !foldersToBeRemoved.includes(folder)) {
                foldersToBeRemoved.push(subFolder);
            }
        }));

        return filteredFolders.filter(elem => !foldersToBeRemoved.includes(elem));
    }

};

export default utils;
