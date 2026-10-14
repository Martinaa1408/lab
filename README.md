# Lab: interactive tools for data science in life sciences

**Live site:** https://martinaa1408.github.io/lab/
**Author:** [Martina Castellucci](https://martinaa1408.github.io/), MSc in Bioinformatics (University of Bologna)

Twenty browser-based tools on the topics of my studies and work: bioinformatics, clinical statistics, machine learning, food safety and teaching. Each tool is a single page with its own controls, charts and a short note on the method.

Everything runs locally in the browser. The tools use simulated data or data the user types in. No data is sent anywhere.

## Tools

### Bioinformatics
| Tool | What it does | Methods |
|---|---|---|
| [DNA sequence toolkit](https://martinaa1408.github.io/lab/sequence-toolkit.html) | GC content, reverse complement, six-frame translation, ORF map | GC skew, ORF finder, standard genetic code |
| [Pairwise alignment](https://martinaa1408.github.io/lab/pairwise-alignment.html) | Global and local alignment with matrix and traceback | Needleman-Wunsch, Smith-Waterman, BLOSUM62 |
| [Phylogenetic tree](https://martinaa1408.github.io/lab/phylogenetic-tree.html) | Distance matrix and tree from aligned sequences | p-distance, Jukes-Cantor, UPGMA, neighbour joining |
| [Protein properties](https://martinaa1408.github.io/lab/protein-properties.html) | Molecular weight, pI, extinction coefficient, hydropathy plot | Kyte-Doolittle, GRAVY |
| [Volcano plot](https://martinaa1408.github.io/lab/volcano-plot.html) | Differential expression with adjustable thresholds | log2 fold change, Benjamini-Hochberg FDR |

### Clinical statistics
| Tool | What it does | Methods |
|---|---|---|
| [Diagnostic test](https://martinaa1408.github.io/lab/diagnostic-test.html) | Predictive values for a given sensitivity, specificity and prevalence | PPV, NPV, likelihood ratios |
| [ROC curve](https://martinaa1408.github.io/lab/roc-curve.html) | Effect of the cut-off on a biomarker test | AUC, Youden index |
| [Survival curves](https://martinaa1408.github.io/lab/survival.html) | Simulated two-arm trial | Kaplan-Meier, log-rank test, hazard ratio |
| [Sample size](https://martinaa1408.github.io/lab/sample-size.html) | Patients needed for a two-group study | Power for two proportions and two means |
| [Clinical scores](https://martinaa1408.github.io/lab/clinical-scores.html) | Common bedside scores | CKD-EPI 2021, CHA₂DS₂-VASc, qSOFA, BMI |
| [Hospital dashboard](https://martinaa1408.github.io/lab/hospital-dashboard.html) | One-year dashboard on synthetic data, with CSV export | Length of stay, bed occupancy, readmissions |

### AI and machine learning
| Tool | What it does | Methods |
|---|---|---|
| [Train a classifier](https://martinaa1408.github.io/lab/logistic-classifier.html) | Logistic regression trained live, with decision boundary | Gradient descent, L2, train/test split |
| [k-means clustering](https://martinaa1408.github.io/lab/kmeans-clustering.html) | Step-by-step clustering and choice of k | k-means++, elbow method, adjusted Rand index |
| [Rare events: ROC vs PR](https://martinaa1408.github.io/lab/rare-events-metrics.html) | Why accuracy and ROC mislead when positives are rare | Precision-recall, average precision |

### Food safety (from my MSc thesis)
| Tool | What it does | Methods |
|---|---|---|
| [Non-compliance statistics](https://martinaa1408.github.io/lab/compliance-statistics.html) | Rates with confidence intervals and enrichment tests | Wilson CI, Fisher exact test, Benjamini-Hochberg |
| [Trend test](https://martinaa1408.github.io/lab/trend-test.html) | Monotonic trend in a monthly series | Mann-Kendall, Sen's slope |
| [Risk alert system](https://martinaa1408.github.io/lab/risk-alert-system.html) | Ranking of contaminant-food pairs into risk tiers | Percentile ranking, composite score, minimum sample rule |

### Teaching
| Tool | What it does | Methods |
|---|---|---|
| [Epidemic simulator](https://martinaa1408.github.io/lab/epidemic-simulator.html) | Vaccination and contact reduction in a town of 10,000 | SIR model, effective R, herd immunity |
| [Food outbreak investigation](https://martinaa1408.github.io/lab/outbreak-investigation.html) | Classroom case: find the dish and the pathogen | Attack rate, relative risk |
| [Mendelian genetics](https://martinaa1408.github.io/lab/mendelian-genetics.html) | Punnett squares and simulated offspring | Segregation, chi-square goodness of fit |

## Validation

The statistical and bioinformatic functions were checked against reference libraries: Biopython (alignment scores, protein properties, neighbour joining), SciPy and statsmodels (Fisher, Wilson, Benjamini-Hochberg, chi-square, UPGMA), scikit-learn (ROC-AUC, average precision, adjusted Rand index) and pymannkendall (Mann-Kendall, Sen's slope).

## Data and disclaimer

All example data are simulated or invented. They do not describe real patients, hospitals, laboratories or companies. The food safety tools reproduce the methods of my MSc thesis on invented numbers.

These tools are for learning and demonstration. They are not medical devices and must not be used for clinical decisions.

## Technical notes

- Plain HTML, CSS and JavaScript. No frameworks, no build step, no external libraries apart from the Inter font.
- Charts are drawn as inline SVG.
- Shared code: `lab.js` (charts, random numbers, statistics helpers) and `lab.css` (tool layout). `style.css` and `main.js` come from my personal website.
- Hosted with GitHub Pages from the `main` branch.

© 2026 Martina Castellucci
