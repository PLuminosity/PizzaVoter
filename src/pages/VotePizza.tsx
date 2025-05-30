import {useEffect, useState} from "react";

export function VotePizza() {
    type Pizza = {
        id: number;
        name: string;
        desc: string;
    }

    const [pizzy, setPizzy] = useState<Pizza[]>([]);
    const [token, setToken] = useState<string>("");
    const [selectedPizzas, setSelectedPizzas] = useState<number[]>([]);


    function fetchAPI() {
        fetch("http://localhost:8080/pizzy", {method: "GET"})
            .then(response => response.json())
            .then(data => setPizzy(data));
    }

    function generateToken() {
        fetch("http://localhost:8080/token", {method: "GET"})
            .then(response => response.text())
            .then(data => {
                setToken(data);
            });
    }

    function postVote(token: string, pizzaIds: number[]) {
        fetch("http://localhost:8080/hlasovani", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token, pizzaIds}),
        })
            .then(() => {
                generateToken();
            })
    }

    useEffect(() => {
        fetchAPI();
        if (!token) {
            generateToken();
        }
    }, []);


    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-center mt-6 md:mt-10">
                <div className="w-full md:w-80 md:ml-8 md:sticky md:top-24 h-full">
                    <ul className="list-none text-gray-700 rounded-lg shadow-md p-4 text-center bg-white min-w-[200px] max-w-xs md:max-w-full h-full">
                        <h1 className="font-bold mb-2">Vybrané pizzy</h1>
                        <div className="text-xs text-gray-500 mb-2 break-all">
                            Token: <span className="text-blue-500">{token}</span>
                        </div>
                        <div className="mb-4">
                            {selectedPizzas.length === 0 ? (
                                <div className="text-red-700 italic">Žádné pizzy vybrány</div>
                            ) : (
                                selectedPizzas.map((pizzaId) => {
                                    const pizza = pizzy.find(p => p.id === pizzaId);
                                    return (
                                        <li key={pizzaId} className="text-center text-red-500">
                                            {pizza?.name}
                                        </li>
                                    );
                                })
                            )}
                        </div>
                        <button
                            className="bg-yellow-300 text-black font-semibold py-2 px-4 rounded w-full hover:bg-yellow-400 transition duration-300 cursor-pointer"
                            onClick={() => {
                                if (selectedPizzas.length > 0) {
                                    postVote(token, selectedPizzas);
                                    alert("Hlasování bylo úspěšné!");
                                    window.location.reload();
                                } else {
                                    alert("Musíte vybrat alespoň jednu pizzu!");
                                }
                            }}
                        >
                            Hlasovat
                        </button>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center mt-6 px-2 md:mt-10 md:pl-10">
                <div className="flex flex-wrap justify-start gap-4 md:gap-6 w-full">
                    {pizzy.map((pizza) => (
                        <div
                            key={pizza.id}
                            className="bg-white rounded-lg shadow-md mt-auto p-4 w-full max-w-xs flex flex-col items-center hover:shadow-lg transition md:p-6 md:w-64"
                        >
                            <h2 className="text-lg md:text-xl font-bold mb-2 text-center">{pizza.name}</h2>
                            <p className="text-gray-600 mb-4 text-center">{pizza.desc}</p>
                            <span className="text-sm text-gray-400 mb-2">ID: {pizza.id}</span>
                            <button
                                className={
                                    selectedPizzas.includes(pizza.id)
                                        ? "bg-green-300 text-black font-semibold py-2 px-4 rounded w-full hover:bg-green-400 transition duration-300 cursor-pointer mt-4"
                                        : "bg-amber-300 text-black font-semibold py-2 px-4 rounded w-full hover:bg-amber-400 transition duration-300 cursor-pointer mt-4"
                                }
                                id={"selectButton" + pizza.id}
                                disabled={!selectedPizzas.includes(pizza.id) && selectedPizzas.length >= 7}
                                onClick={() => {
                                    const currentButton = document.getElementById("selectButton" + pizza.id);
                                    if (!selectedPizzas.includes(pizza.id) && selectedPizzas.length < 7) {
                                        setSelectedPizzas([...selectedPizzas, pizza.id]);
                                    } else if (selectedPizzas.includes(pizza.id)) {
                                        setSelectedPizzas(selectedPizzas.filter(id => id !== pizza.id));
                                    }
                                    if (currentButton && selectedPizzas.includes(pizza.id)) {
                                        currentButton.textContent = "Vybrat";
                                    } else if (currentButton) {
                                        currentButton.textContent = "Vybráno"
                                    }
                                }}
                            >
                                Vybrat
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}