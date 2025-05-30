import {useEffect, useState} from "react";

export function AddPizza() {
    type Pizza = {
        id: number;
        name: string;
        desc: string;
    }

    const [pizzy, setPizza] = useState<Pizza[]>([]);

    function fetchAPI() {
        fetch("http://localhost:8080/pizzy", {method: "GET"})
            .then(response => response.json())
            .then(data => setPizza(data));
    }

    function addPizza(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const name = (form.elements.namedItem('pizzaName') as HTMLInputElement).value;
        const description = (form.elements.namedItem('pizzaDescription') as HTMLInputElement).value;
        const btn = document.getElementById("addPizzaButton");

        const params = new URLSearchParams();
        params.append('pizzaName', name);
        params.append('pizzaDesc', description);

        fetch("http://localhost:8080/add", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: params.toString()
        }).then(() => {
            if (btn) {
                btn.setAttribute("disabled", "true");
                btn.classList.add("opacity-50", "cursor-not-allowed");
                btn.textContent = "Pizza přidána";

                setTimeout(() => {
                    btn.removeAttribute("disabled");
                    btn.classList.remove("opacity-50", "cursor-not-allowed");
                    btn.textContent = "Přidat pizzu";
                    form.reset();
                    fetchAPI();
                }, 1000);
            }
        });
    }

    function removePizza(pizzaId: number) {
        fetch(`http://localhost:8080/delete/${pizzaId}`, {method: "DELETE"})
            .then(() => {
                fetchAPI();
            });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        addPizza(event);
    }


    useEffect(() => {
        fetchAPI();
    }, []);

    return (
        <>
            <div className="flex justify-center mt-10">
                <form
                    method="POST"
                    onSubmit={handleSubmit}
                    className="min-w-[300px] sm:min-w-[200px] bg-white p-4 sm:p-8 rounded-lg shadow-md w-full max-w-md mb-8"
                >
                    <h2 className="text-2xl font-bold mb-4 text-center">Přidat novou pizzu</h2>
                    <input
                        type="text"
                        name="pizzaName"
                        id="name"
                        placeholder="Zadejte název pizzy"
                        className="border border-gray-300 p-2 rounded w-full mb-4 text-center focus:placeholder-gray-400"
                        required
                        onFocus={e => e.target.placeholder = ""}
                        onBlur={e => e.target.placeholder = "Zadejte název pizzy"}
                    />
                    <textarea
                        name="pizzaDescription"
                        id="desc"
                        placeholder="Přidejte popis pizzy"
                        className="border border-gray-300 p-2 rounded w-full mb-4  focus:placeholder-gray-400 overflow-hidden resize-none h-24 text-center"
                        required
                        onFocus={e => e.target.placeholder = ""}
                        onBlur={e => e.target.placeholder = "Přidejte popis pizzy"}
                    />
                    <button
                        type="submit"
                        id="addPizzaButton"
                        className="bg-amber-300 text-black font-semibold py-2 px-4 rounded w-full hover:bg-amber-400 transition duration-300 cursor-pointer"
                    >
                        Přidat pizzu
                    </button>
                </form>
            </div>
            <div className={pizzy.length == 0 ? "hidden" : "flex justify-center mt-8 mb-10"}>
                <div className="max-w-[2000px] overflow-x-auto">
                    <table className="table-auto min-w-[300px] sm:min-w-[200px] w-full max-w-[1000px] break-after-all bg-white rounded-md shadow-lg overflow-hidden">
                    <thead className="bg-amber-200">
                    <tr>
                        <th className="px-6 py-3 text-center text-lg font-semibold text-gray-800">
                            Pizza ID
                        </th>
                        <th className="px-6 py-3 text-center text-lg font-semibold text-gray-800">
                            Název
                        </th>
                        <th className="px-6 py-3 text-center text-lg font-semibold text-gray-800">
                            Popis
                        </th>
                        <th className="px-6 py-3 text-center text-lg font-semibold text-gray-800">
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {pizzy.map((pizza) => (
                        <tr key={pizza.id} className="even:bg-gray-100 ">
                            <td className="px-6 py-4 text-center text-gray-700">
                                {pizza.id}
                            </td>
                            <td className="px-6 py-4 text-center text-gray-700">
                                {pizza.name}
                            </td>
                            <td className="px-6 py-4 text-center text-gray-700">
                                {pizza.desc}
                            </td>
                            <td>
                                <button
                                    className="bg-transparent text-red-600 font-semibold py-2 px-4 rounded w-full hover:text-red-800 transition duration-300 cursor-pointer"
                                    onClick={() => removePizza(pizza.id)}
                                >
                                    Odebrat
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            </div>
        </>
    )
}