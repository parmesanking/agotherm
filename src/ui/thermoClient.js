const api = process.env.SERVERURL || "https://stockier-lobster-6340.dataplicity.io";

const headers = {
  Accept: "application/json"
};

export const doGetStatus = () =>
  fetch(`${api}/status`, { headers })
    .then(res => res.json())
    .then(stat => stat);

export const doGetConf = () =>
  fetch(`${api}/conf`, { headers })
    .then(res => res.json())
    .then(conf => conf);

export const doSetConf = week =>
  fetch(`${api}/setweek`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({week: week })
  })
    .then(res => res.json())
    .then(stat => stat);

export const doManual = command =>
  fetch(`${api}/manual/${command}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(stat => stat);
