import { useEffect, useState } from "react"
import {Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer} from "recharts"


export function ResultSummary() {
    const [votes, setVotes] = useState<Record<string, number>>({})

    function getVotes() {
        fetch("http://localhost:8080/VotedPizzasSummary", {method: "GET"})
            .then(response => response.json())
            .then(data => setVotes(data))
    }

    useEffect(() => {
        getVotes()
        console.log(votes)
    }, [])
    return (
        <>
            <div>
                <div className="flex flex-col items-center mt-10 px-2">
                    <h1 className="text-2xl font-bold text-center mt-10 mb-4">Výsledky hlasování</h1>
                    <p className="text-center text-gray-600 mb-6">Zde jsou výsledky hlasování o pizzy.</p>
                    <ol className="list-decimal list-inside text-gray-700 mb-6 w-full max-w-md">
                        {Object.entries(votes).length === 0 ? (
                            <li className="text-center text-gray-500 justify-center">Zatím nebylo hlasováno.</li>
                        ) : (
                            Object.entries(votes)
                                .sort((a, b) => b[1] - a[1])
                                .map(([name, value]) => (
                                <li key={name} className="text-center text-gray-700 mb-2 bg-amber-200 justify-center p-2 rounded-md shadow-sm">
                                    {name}: <span className="font-bold">{value} hlasů</span>
                                </li>
                            ))
                        )}
                    </ol>
                </div>
                <ResponsiveContainer width="100%" height={650} className="mx-auto">
                    <BarChart
                        width={800}
                        height={650}
                        data={Object.entries(votes).sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value }))}
                        margin={{ top: 50, right: 30, left: 30, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <Bar dataKey="value" fill="#fcd34d" />
                        <YAxis
                            dataKey="value"
                            domain={[0, Math.max(1, ...Object.values(votes)) + 1]}
                            allowDecimals={false}
                            ticks={Array.from(
                                { length: Math.max(1, ...Object.values(votes)) + 2 },
                                (_, i) => i
                            )}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}