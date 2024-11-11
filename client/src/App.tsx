import { Navbar } from "@/components/composite/Navbar";
import { MessageDisplay } from "@/components/composite/MessageDisplay";
import { MessageForm } from "@/components/composite/MessageForm";
import { Button } from "./components/ui/button";
import { ColourProvider } from "@/contexts/ColourContext";

import { useState } from "react";

function App() {
    const [formOpen, setFormOpen] = useState(false);

    return (
        <ColourProvider>
            <div className="flex flex-col h-screen w-screen">
                {/* navbar */}
                <Navbar className="p-4 flex-col items-center group sm:flex-row">
                    <h1 className="text-2xl font-bold sm:mr-auto">
                        Mini Messaging App
                    </h1>
                    <Button
                        className="text-lg bg-[hsl(var(--dark-grey))] hover:bg-[hsl(var(--green))] hover:text-[hsl(var(--green-foreground))] transition-all duration-200"
                        onClick={() => setFormOpen(true)}
                    >
                        Send Message
                    </Button>
                </Navbar>

                {/* message display */}
                <MessageDisplay />

                {/* message form */}
                {formOpen && <MessageForm setFormOpen={setFormOpen} />}
            </div>
        </ColourProvider>
    );
}

export default App;
