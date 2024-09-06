function pesquisar() {
  const input = document.getElementById("athlete_name");
  const section = document.getElementById("research-results");
  const research = String(input.value.toLowerCase()).trim();

  // if (!research.length) {
  //   section.innerHTML =
  //     "<p>Nenhum resultado encontrado. Digite o nome de um(a) atleta ou esporte</p>";
  //   return;
  // }

  const fragment = document.createDocumentFragment();

  const filteredResults = dataArray.filter((athlete) => {
    const titleMatch = athlete.title.toLowerCase().includes(research);
    const descriptionMatch = athlete.description
      .toLowerCase()
      .includes(research);
    const tagsMatch = athlete.tags.toLowerCase().includes(research);

    return titleMatch || descriptionMatch || tagsMatch;
  });

  const config = {
    noResults: {
      message:
        "<p>Nenhum resultado encontrado. Digite o nome de um(a) atleta ou esporte</p>",
      apply: (section) => {
        section.innerHTML = config.noResults.message;
      },
    },
    hasResults: {
      apply: (section, results) => {
        results.forEach((athlete) => {
          const article = document.createElement("article");
          article.classList.add("item-result");

          const h2 = document.createElement("h2");
          const titleLink = createLink({
            href: athlete.link,
            textContent: athlete.title,
          });
          h2.appendChild(titleLink);
          article.appendChild(h2);

          const descriptionParagraph = createParagraph({
            classList: "meta-description",
            textContent: athlete.description,
          });
          article.appendChild(descriptionParagraph);

          const moreInfoLink = createLink({
            href: athlete.link,
            textContent: "Mais informações",
          });
          article.appendChild(moreInfoLink);

          fragment.appendChild(article);
        });

        section.innerHTML = "";
        section.appendChild(fragment);
      },
    },
  };

  const resultConfig = filteredResults.length > 0 ? "hasResults" : "noResults";

  config[resultConfig].apply(section, filteredResults);
}

const createLink = ({ href, target = "_blank", textContent }) => {
  const link = document.createElement("a");
  link.href = href;
  link.target = target;
  link.textContent = textContent;
  return link;
};

const createParagraph = ({ classList, textContent }) => {
  const paragraph = document.createElement("p");
  paragraph.classList.add(classList);
  paragraph.textContent = textContent;
  return paragraph;
};
