import trim from 'lodash.trim'
import inquirer from 'inquirer'
import removeAccents from 'remove-accents'
import dateFormat from "dateformat"
import { writeFile } from 'fs'

const prompt = inquirer.createPromptModule()
const now = new Date()
const date = dateFormat(now, 'yyyy-mm-dd')
const time = dateFormat(now, 'HH:MM:ss -0000')
const dateFrontmatter = date + ' ' + time

let categories, tags, filename
const lines = []

function sluggify(title) {
  const replace = [/\s+/g, /'+/g, /"+/g, /\.+/g, /,+/g]
  replace.push(/-+/g) //A besoin d'être à la fin pour éliminer les doublons
  title = removeAccents(title)
  title = replace.reduce((title, expr) => title.replace(expr, '-'), title)
  title = trim(title, '-')
  title = title.toLowerCase()
  return title
}

function normalizeKeywords(keywords, options = { toLowerCase: false }) {
  function transform(text) {
    return options.toLowerCase ? text.toLowerCase() : text
  }
  const normalized = keywords.map(keyword => `"${transform(trim(keyword))}"`).filter(keyword => keyword.length > 2)
  return [...new Set(normalized)] //Pour éliminer les doublons
}

const questions = [
  {
    type: "list",
    name: "author",
    message: "Auteur?",
    choices: [
      "kafkaah",
      "ttonatiuhh"
    ],
    default: "ttonatiuhh"

  },
  {
    type: "input",
    name: "title",
    message: "Titre de l'article?",
    validate: answer => answer ? true : 'Il faut un titre'
  },
  {
    type: "checkbox",
    name: "categories",
    message: "Catégories?",
    choices: [
      "Programmation",
      "Que sais-je?",
      "Voitures",
      "Quotidien",
      "Note de lecture",
      "Question/réponse",
      "Anecdotes",
      "Discours!"
    ],
    validate: answer => answer.length > 0 ? true : 'Il faut au moins une catégorie'
  },
  {
    type: "input",
    name: "tags",
    message: "Tags supplémentaires (séparés par une virgule)"
  },
]

prompt(questions)
  .then((answers) => {
    /*
    Modèle
    Note: toutes les datetimes sont en UTC
    Note: le paramètre "fichier" n'est pas standard et sert seulement
          à indiquer le nom du fichier markdown
    ---
    layout: post
    author: ttonatiuhh
    title: La  grande Misère  humaine des jOURS
    date: 2022-10-11 12:11:03 -0000
    categories: [Voitures, Programmation, Quotidien, Anecdotes, Que sais-je]
    tags: [Voitures, Programmation, Quotidien, Anecdotes, "Que sais-je", "La ferme des animaux"]
    fichier: 2022-10-11-la-grande-misere-humaine-des-jours.md
    ---   
    */

    tags = normalizeKeywords(answers['categories'], { toLowerCase: true })
      .concat(normalizeKeywords(answers['tags'].split(','), { toLowerCase: true }))
    categories = normalizeKeywords(answers['categories'])
    filename = `${date}-${sluggify(answers['title'])}.md`

    lines.push('---')
    lines.push('layout: post')
    lines.push("author:\n  - name: " + answers['author'] + "\n  - site: https://erabliere.ga/" + answers['author'])
    lines.push(`title: ${answers['title']}`)
    lines.push(`date: ${dateFrontmatter}`)
    lines.push(`categories: [${categories.join(', ')}]`)
    lines.push(`tags: [${tags.join(', ')}]`)
    lines.push(`fichier: ${filename}`)
    lines.push('---')
    /*lines.push('<!-- Pour insérer une image dans le répertoire [assets]: -->')
    lines.push('<!-- ![SAAB 93](/docs/assets/images/SAAB_93.jpg) -->')
    lines.push('<!-- Pour insérer une image du web: -->')
    lines.push('<!-- ![Markdown](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg) -->')
    lines.push('<!-- Pour insérer un lien web: -->')
    lines.push('<!-- [Page principale, Google](https://www.google.ca/?hl=fr) -->')*/
    lines.push("\n\n")

    writeFile('./_posts/' + filename, lines.join("\n"), () => console.log(`Fichier [${filename}] créer dans le répertoire [_posts]`))
  })
  .catch((error) => {
    console.error(error)
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment

    } else {
      // Something else went wrong
    }
  })
