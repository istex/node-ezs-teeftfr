import { Lexicon, RuleSet, BrillPOSTagger } from 'natural';

const baseFolder = `${__dirname}/..`;
const lexiconFilename = `${baseFolder}/resources/lexicon_from_posjs.json`;
const defaultCategory = 'UNK';

const lexicon = new Lexicon(lexiconFilename, defaultCategory);
const rules = new RuleSet();
const tagger = new BrillPOSTagger(lexicon, rules);

const toCommonStruct = taggedWord => ({
    token: taggedWord.token,
    tag: [taggedWord.tag],
});

/**
 * POS Tagger from natural
 *
 * French pos tagging using natural (and LEFFF resources)
 *
 * @example
 *  [{ "token": "dans",      "tag": ["prep"] },
     { "token": "le",        "tag": ["det"]  },
     { "token": "cadre",     "tag": ["nc"] },
     { "token": "du",        "tag": ["det"] },
     { "token": "programme", "tag": ["nc"] }
     },
    ]
 *
 * @export
 * @param {Array<Array<String>>} data  Array of arrays of tokens (string)
 * @param {Array<Array<Object>>} feed  Array of arrays of tokens (object, with `token` and `tag`)
 * @returns
 */
export default function TEEFTNaturalTag(data, feed) {
    if (this.isLast()) {
        return feed.close();
    }
    const res = tagger.tag(data);
    feed.write([res.taggedWords.map(toCommonStruct)]);
    feed.end();
}
