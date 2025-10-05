import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import RedirectButon from './RedirectButon';

function Recrutari() {



    return (
        <section id="recrutari" className="py-20 bg-cream">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-navy mb-16 section-title">FIIRBots recruteaza</h2>
                {/* button for form */}
                <div>
                    <RedirectButon/>
                </div>
            </div>
        </section>
    );
}

export default Recrutari;