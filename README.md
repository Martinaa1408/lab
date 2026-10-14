# Lab

Interactive tools on the topics of my work, internship, studies and teaching.

**Site:** https://martinaa1408.github.io/lab/
**Author:** [Martina Castellucci](https://martinaa1408.github.io/), MSc in Bioinformatics, University of Bologna

Everything runs in the browser. The tools use simulated data or data the user types in, and nothing is sent anywhere.

## Tools

| Tool | Area | Content |
|---|---|---|
| [Hospital KPIs](https://martinaa1408.github.io/lab/hospital-kpis.html) | Healthcare data | Admissions, length of stay, bed occupancy and readmissions for a simulated hospital, with the SQL behind each indicator |
| [Diagnostic test](https://martinaa1408.github.io/lab/diagnostic-test.html) | Healthcare data | Predictive values from sensitivity, specificity and prevalence; ROC curve and cut-off |
| [Food safety](https://martinaa1408.github.io/lab/food-safety.html) | Food safety | Non-compliance rates with Wilson intervals and Fisher enrichment tests, Mann-Kendall trend test, risk ranking |
| [Sequence tools](https://martinaa1408.github.io/lab/sequence-tools.html) | Bioinformatics | DNA and protein properties, pairwise alignment with the score matrix |
| [Biology in class](https://martinaa1408.github.io/lab/biology-class.html) | Teaching | Epidemic simulator, Mendelian genetics, finding a mutation in the beta-globin gene |
| [Food outbreak investigation](https://martinaa1408.github.io/lab/outbreak.html) | Teaching | A classroom case: find the dish and the pathogen behind an outbreak |

The food safety tools follow the methods of my MSc thesis on food contamination risk. The teaching tools come from school orientation talks, tutoring and courses.

## Checks

The statistical and sequence functions were compared with Biopython, SciPy, statsmodels and pymannkendall and give the same results.

## Data

All example data are simulated or invented. They do not describe real patients, hospitals, laboratories or companies. The tools are for learning and are not medical devices.

## Technical notes

Plain HTML, CSS and JavaScript, with no frameworks or build step. Charts are inline SVG. `style.css` and `main.js` come from my personal website; `lab.css` and `lab.js` hold the shared tool code. Hosted with GitHub Pages from the `main` branch.

© 2026 Martina Castellucci
