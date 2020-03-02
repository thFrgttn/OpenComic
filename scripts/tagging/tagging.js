var folderPath = '';
var files = [];
var scrapper = require('./comicvine_scapper');

function openTagging() {
  var dialog = electron.remote.dialog;

  dialog
    .showOpenDialog({
      properties: ['openDirectory']
    })
    .then(function(folder) {
      if (folder.filePaths && folder.filePaths[0]) {
        folderPath = folder.filePaths[0];

        files = file.returnAll(folderPath);
        i = 0;
        files.forEach((file) => {
          file.index = i++;
          file.series = getQueryString(file.name);
        });

        handlebarsContext.taggingComics = files;

        //template.changeHeader
        template.loadContentLeft('tagging.content.left.html', true);
        template.loadContentRight('tagging.content.right.html', true, true);
      }
    });
}

//Go to a specific comic
function tagComic(comicIndex) {
  if (typeof files[comicIndex] !== 'undefined') {
    handlebarsContext.currentTaggingComic = files[comicIndex];

    template.loadContentRight('tagging.content.right.html', true, true);
    //goToIndex(comicIndex);
    //goToImageCL(comicIndex, true);
  }
}

// Scraping functions
function getQueryString(file) {
  var title = '';

  title = file.replace(/\.[^/.]+$/, '');
  title = title.replace(' - ', ' ');

  // return only first 4 words to avoid incorrect words from the end of the filename
  title = title
    .split(/\s+/)
    .splice(0, 4)
    .join(' ');

  return title;
}

function queryVolume() {
  queryString = document.getElementById('input_seriesName').value;

  scrapper.requestVolumeIDS(queryString, (error, body) => {
    if (error) {
      console.log(error);
    } else {
      result = body;
    }
    console.log(result);
  });
}

module.exports = {
  openTagging: openTagging,
  tagComic: tagComic,
  queryVolume: queryVolume
};
