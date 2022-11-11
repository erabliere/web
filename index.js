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

function quote(text) {
  return `"${text.replace(/"/gm, '\\"')}"`
}

function normalizeKeywords(keywords, options = { toLowerCase: false }) {
  function transform(text) {
    return options.toLowerCase ? text.toLowerCase() : text
  }
  const normalized = keywords.map(keyword => `${quote(transform(trim(keyword)))}`).filter(keyword => keyword.length > 2)
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
    type: "checkbox",
    name: "categories",
    message: "Catégories?",
    choices: [
      "Notes de film",
      "Notes de lecture",
      "Programmation",
      "Mathématiques",
      "Que sais-je?",
      "Mot nouveau",
      "Voitures",
      "Quotidien",
      "Sports",
      "Question/réponse",
      "Anecdotes",
      "Discours!"
    ],
    validate: answer => answer.length > 0 ? true : 'Il faut au moins une catégorie'
  },
  {
    type: "input",
    name: "title",
    message: "Titre de l'article?",
    validate: answer => answer ? true : 'Il faut un titre'
  },
  {
    type: "input",
    name: "tags",
    message: "Tags (séparés par une virgule)?"
  },
  {
    type: "checkbox",
    name: "amis",
    message: "Des amis?",
    choices: [
      "MD",
      "LJ",
      "TD",
      "AD",
      "CC",
      "AJ"
    ]
  },
  {
    type: "input",
    name: "amis_sup",
    message: "Amis supplémentaires (séparés par une virgule)?"
  },
  {
    type: "list",
    name: "visible",
    message: "Visible?",
    choices: [
      "oui",
      "non"
    ],
    default: "oui"
  }
]

prompt(questions)
  .then((answers) => {

    tags = normalizeKeywords(answers['categories'], { toLowerCase: true })
      .concat(normalizeKeywords(answers['tags'].split(','), { toLowerCase: true }))
      .concat(normalizeKeywords(answers['amis_sup'].split(','), { toLowerCase: true }))
      .concat(normalizeKeywords(answers['amis'], { toLowerCase: true }))
    categories = normalizeKeywords(answers['categories'])
    filename = `${date}-${sluggify(answers['title'])}.md`

    lines.push('---')
    lines.push('layout: post')
    lines.push(`author: ${quote(answers['author'])}`)
    lines.push(`title: ${quote(answers['title'])}`)
    lines.push(`date: ${quote(dateFrontmatter)}`)
    lines.push(`categories: [${categories.join(', ')}]`)
    lines.push(`tags: [${tags.join(', ')}]`)
    lines.push(`fichier: ${quote(filename)}`)
    lines.push(`visible: ${quote(answers['visible'])}`)
    lines.push('---')
    lines.push("\n\n")

    writeFile('./_posts/' + filename, lines.join("\n"), () => console.log(`Fichier [ ${filename} ] créé dans le répertoire [ _posts ]`))
  })
  .catch((error) => {
    console.error(error)
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment

    } else {
      // Something else went wrong
    }
  })
