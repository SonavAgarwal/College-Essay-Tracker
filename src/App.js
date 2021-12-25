import React, { useEffect, useState } from "react";
import "./App.css";
import { CartesianGrid, Cell, Label, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet("1ulPZaAQeZTx-dujuo9IZ35aWwj6TQgBqai7MCqKWWhQ");
doc.useApiKey(process.env.REACT_APP_SHEETS_API_KEY);

function AppWrap() {
    return <App />;
}

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => {
            setMatches(media.matches);
        };
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
}

function App(props) {
    const [rowsData, setRowsData] = useState(null);
    const [sheet, setSheet] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const isMobile = useMediaQuery("(max-aspect-ratio: 1/1)");

    useEffect(function () {
        async function getData() {
            await doc.loadInfo();
            const sheetT = doc.sheetsByIndex[0];
            await sheetT.loadCells("C2:D2");
            const rows = await sheetT.getRows();
            setSheet(sheetT);
            setRowsData(rows);
            setLoaded(true);
        }

        getData();
    }, []);

    if (!loaded) return <div></div>;

    const completionPieData = [
        { name: "Completed", value: sheet?.getCellByA1("C2").value, color: "var(--primary)" },
        { name: "Remaining", value: sheet?.getCellByA1("D2").value - sheet?.getCellByA1("C2").value, color: "var(--secondary)" },
    ];

    if (isMobile) {
        return (
            <div style={{ height: "100%", width: "100%" }}>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        boxSizing: "border-box",
                        padding: "1rem",
                    }}>
                    <h1 style={{ fontSize: "2rem" }}>My Remaining College Essays</h1>
                </div>
                <div style={{ width: "100%", height: "100vw", position: "relative" }}>
                    <div style={{ position: "absolute", width: "100%", height: "100%", boxSizing: "border-box", padding: "2rem" }}>
                        <ResponsiveContainer width={"100%"} height={"100%"}>
                            <LineChart data={rowsData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <XAxis
                                    dataKey='Date'
                                    stroke='var(--secondary)'
                                    strokeWidth={5}
                                    strokeLinecap='round'
                                    tickMargin={10}
                                    tickCount={5}
                                    interval={"preserveEnd"}
                                />
                                <YAxis
                                    // label='Essays Remaining'

                                    dataKey='Count'
                                    stroke='var(--secondary)'
                                    strokeWidth={5}
                                    strokeLinecap='round'
                                    tickMargin={10}>
                                    <Label angle={-90} value='Essays Remaining' position='insideLeft' style={{ textAnchor: "middle" }} />
                                </YAxis>
                                <Line type='natural' dataKey='Count' dot={false} stroke='var(--primary)' strokeWidth={5} strokeLinecap='round' yAxisId={0} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <h1 style={{ fontSize: "5rem" }}>
                        <span style={{ color: "var(--primary)" }}>{sheet.getCellByA1("C2").value}</span> / {sheet.getCellByA1("D2").value}
                    </h1>
                    <h1 style={{ fontSize: "2rem" }}>essays completed</h1>
                </div>
                <div style={{ width: "100%", height: "100vw", position: "relative" }}>
                    <div style={{ position: "absolute", width: "100%", height: "100%", boxSizing: "border-box", padding: "2rem" }}>
                        <ResponsiveContainer width={"100%"} height={"100%"}>
                            <PieChart>
                                <Pie dataKey='value' data={completionPieData} cx='50%' cy='50%' fill='var(--primary)'>
                                    {completionPieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", width: 0 }}>
                <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <h1 style={{ fontSize: "2rem" }}>My Remaining College Essays</h1>
                </div>
                <div style={{ flex: 1, position: "relative" }}>
                    <div style={{ position: "absolute", width: "100%", height: "100%", boxSizing: "border-box", padding: "5rem" }}>
                        <ResponsiveContainer width={"100%"} height={"100%"}>
                            <LineChart data={rowsData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <XAxis
                                    dataKey='Date'
                                    stroke='var(--secondary)'
                                    strokeWidth={5}
                                    strokeLinecap='round'
                                    tickMargin={10}
                                    tickCount={5}
                                    interval={"preserveEnd"}
                                />
                                <YAxis
                                    // label='Essays Remaining'

                                    dataKey='Count'
                                    stroke='var(--secondary)'
                                    strokeWidth={5}
                                    strokeLinecap='round'
                                    tickMargin={10}>
                                    <Label angle={-90} value='Essays Remaining' position='insideLeft' style={{ textAnchor: "middle" }} />
                                </YAxis>{" "}
                                <Line type='natural' dataKey='Count' dot={false} stroke='var(--primary)' strokeWidth={5} strokeLinecap='round' yAxisId={0} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", width: 0 }}>
                <div style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "relative" }}>
                    <div style={{ position: "absolute", width: "100%", height: "100%", boxSizing: "border-box", padding: "5rem" }}>
                        <ResponsiveContainer width={"100%"} height={"100%"}>
                            <PieChart>
                                <Pie dataKey='value' data={completionPieData} cx='50%' cy='50%' fill='var(--primary)'>
                                    {completionPieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <h1 style={{ fontSize: "5rem" }}>
                        <span style={{ color: "var(--primary)" }}>{sheet.getCellByA1("C2").value}</span> / {sheet.getCellByA1("D2").value}
                    </h1>
                    <h1 style={{ fontSize: "2rem" }}>essays completed</h1>
                </div>
            </div>
        </div>
    );
}

export default AppWrap;
