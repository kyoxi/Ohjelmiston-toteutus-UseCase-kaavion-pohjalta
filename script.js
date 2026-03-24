let votes = JSON.parse(localStorage.getItem("votes")) || [];
let selectedVoteIndex = localStorage.getItem("selectedVoteIndex");

if (document.getElementById("voteList")) {
    let list = document.getElementById("voteList");
    votes.forEach((vote, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<a href="vote.html" onclick="selectVote(${index})">${vote.title}</a>`;
        list.appendChild(li);
    });
}

function selectVote(index) {
    localStorage.setItem("selectedVoteIndex", index);
}

if (document.getElementById("voteTitle")) {
    let vote = votes[selectedVoteIndex];
    document.getElementById("voteTitle").innerText = vote.title;

    let form = document.getElementById("voteForm");
    vote.options.forEach((option, i) => {
        form.innerHTML += `<input type="radio" name="option" value="${i}">${option}<br>`;
    });
}

function submitVote() {
    let selected = document.querySelector('input[name="option"]:checked');
    if (!selected) {
        document.getElementById("message").innerText = "Valitse vaihtoehto!";
        return;
    }

    let vote = votes[selectedVoteIndex];
    vote.votes[selected.value]++;
    localStorage.setItem("votes", JSON.stringify(votes));

    document.getElementById("message").innerText = "Ääni tallennettu!";
}

function createVote() {
    let title = document.getElementById("newVoteTitle").value;
    let option1 = document.getElementById("option1").value;
    let option2 = document.getElementById("option2").value;

    if (!title || !option1 || !option2) {
        alert("Täytä kaikki kentät");
        return;
    }

    votes.push({
        title: title,
        options: [option1, option2],
        votes: [0, 0]
    });

    localStorage.setItem("votes", JSON.stringify(votes));
    alert("Äänestys luotu!");
    location.reload();
}

if (document.getElementById("adminVoteList")) {
    let list = document.getElementById("adminVoteList");
    votes.forEach((vote, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${vote.title} <button onclick="deleteVote(${index})">Poista</button>`;
        list.appendChild(li);
    });
}

function deleteVote(index) {
    votes.splice(index, 1);
    localStorage.setItem("votes", JSON.stringify(votes));
    location.reload();
}

