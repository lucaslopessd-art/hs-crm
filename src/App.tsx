import * as React from 'react'
import { BrowserRouter, Routes, Route, Navigate, NavLink, Link } from 'react-router-dom'
import { calcCommission, calcMonthlyBonus, pickCancelBand } from './lib/compensation'

type Estagio = 'oferecimento'|'prospeccao'|'visita'|'fechamento'
type Lead = {
  id: string;
  nome: string;
  telefone: string;
  interesse: 'Veículo'|'Imóvel'|'Investimento'|'Outros';
  estagio: Estagio;
  credito: number;
}

type StoreShape = {
  leads: Lead[];
  seed: (n:number)=>void;
  clear: ()=>void;
}

const StoreCtx = React.createContext<StoreShape>({leads:[], seed:()=>{}, clear:()=>{}})
function useStore(){ return React.useContext(StoreCtx) }

const NAMES = ["Pedro","Camila","Leonardo","Marina","Rafa","Bianca","Carlos","Ana","João","Lívia","Tatiana","Diego","Priscila","Rodrigo","Carolina","Marcelo","Vanessa","Felipe","Renata","Gustavo"]
const INTERESSES: Lead['interesse'][] = ['Veículo','Imóvel','Investimento','Outros']

function rand<T>(arr:T[]):T{ return arr[Math.floor(Math.random()*arr.length)] }
function makePhone(){
  const ddd = 10 + Math.floor(Math.random()*80);
  const p1  = 1000 + Math.floor(Math.random()*9000);
  const p2  = 1000 + Math.floor(Math.random()*9000);
  return "(" + ddd + ") 9" + p1 + "-" + p2;
}

function StoreProvider({children}:{children:React.ReactNode}){
  const [leads,setLeads] = React.useState<Lead[]>([])

  const seed = (n:number)=>{
    const dist = { oferecimento:0.35, prospeccao:0.25, visita:0.20, fechamento:0.20 } as const
    const qOf = Math.round(n*dist.oferecimento)
    const qPr = Math.round(n*dist.prospeccao)
    const qVi = Math.round(n*dist.visita)
    const qFe = n - (qOf + qPr + qVi)

    const build = (estagio:Estagio, q:number)=>{
      const arr:Lead[] = []
      for(let i=0;i<q;i++){
        arr.push({
          id: estagio + "_" + Date.now() + "_" + i,
          nome: rand(NAMES) + " Teste",
          telefone: makePhone(),
          interesse: rand(INTERESSES),
          estagio,
          credito: 10_000 + Math.floor(Math.random()*90_000),
        })
      }
      return arr
    }

    setLeads([
      ...build('oferecimento', qOf),
      ...build('prospeccao', qPr),
      ...build('visita', qVi),
      ...build('fechamento', qFe),
    ])
  }

  const clear = ()=>setLeads([])

  return <StoreCtx.Provider value={{leads, seed, clear}}>{children}</StoreCtx.Provider>
}

function Header(){
  return (
    <header className="header">
      <div className="container hstack" style={{justifyContent:'space-between'}}>
        <div className="hstack" style={{gap:8}}>
          <div className="badge" style={{background:'#fee2e2',color:'#b91c1c'}}>HS</div>
          <strong>HS CRM</strong>
        </div>
        <nav className="nav hstack" style={{gap:6}}>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/pipeline">Pipeline</NavLink>
          <NavLink to="/planejamento">Planejamento</NavLink>
          <NavLink to="/performance">Performance</NavLink>
          <NavLink to="/comissoes">Comissões</NavLink>
          <NavLink to="/bonus">Calculadora de Bônus</NavLink>
          <NavLink to="/seed">Seed</NavLink>
        </nav>
      </div>
    </header>
  )
}

function Dashboard(){
  const {leads} = useStore()
  const total = leads.length
  const fech = leads.filter(l=>l.estagio==='fechamento').length
  const conv = Math.round((fech/Math.max(1,total))*1000)/10
  return (
    <div className="container vstack">
      <h1>Dashboard Vendedor</h1>
      <div className="grid-4">
        <div className="card"><div className="kheader">Pipeline Ativo</div><div style={{fontSize:28,fontWeight:700}}>{total}</div></div>
        <div className="card"><div className="kheader">Conversão</div><div style={{fontSize:28,fontWeight:700}}>{conv}%</div></div>
        <div className="card"><div className="kheader">Comissão Prevista</div><DashCommission /></div>
        <div className="card"><div className="kheader">Fechamentos</div><div style={{fontSize:28,fontWeight:700}}>{fech}</div></div>
      </div>
    </div>
  )
}

function DashCommission(){
  const {leads} = useStore()
  const totalFechado = leads.filter(l=>l.estagio==='fechamento').reduce((s,l)=> s + Math.round(calcCommission(l.credito)), 0)
  return <div style={{fontSize:28,fontWeight:700}}>R$ {totalFechado.toLocaleString()}</div>
}

function Pipeline(){
  const {leads} = useStore()
  const cols = [
    { id:'oferecimento', label:'Oferecimento'},
    { id:'prospeccao', label:'Prospecção'},
    { id:'visita', label:'Visita'},
    { id:'fechamento', label:'Fechamento'},
  ] as const
  return (
    <div className="container vstack">
      <div className="hstack" style={{justifyContent:'space-between'}}>
        <h1>Pipeline de Vendas</h1>
        <Link className="btn" to="/seed">Gerar 300 Leads</Link>
      </div>
      <div className="grid-4">
        {cols.map(c=> (
          <div key={c.id} className="card vstack kcol">
            <div className="hstack" style={{justifyContent:'space-between'}}>
              <div className="kheader">{c.label}</div>
              <span className="badge">{leads.filter(l=>l.estagio===c.id).length}</span>
            </div>
            {leads.filter(l=>l.estagio===c.id).slice(0,8).map(l=> (
              <div key={l.id} className="kcard">
                <div style={{fontWeight:600}}>{l.nome}</div>
                <div className="small">{l.telefone} • {l.interesse}</div>
                <div className="small">Crédito: R$ {l.credito.toLocaleString()}</div>
              </div>
            ))}
            {leads.filter(l=>l.estagio===c.id).length===0 && (
              <div className="small">Sem leads neste estágio.</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Planejamento(){
  return (
    <div className="container vstack">
      <h1>Planejamento Semanal</h1>
      <div className="grid-4">
        <div className="card"><div className="kheader">Atividades Executadas</div><div style={{fontSize:28,fontWeight:700}}>0/4</div></div>
        <div className="card"><div className="kheader">Leads Gerados</div><div style={{fontSize:28,fontWeight:700}}>0</div></div>
        <div className="card"><div className="kheader">Leads por Atividade</div><div style={{fontSize:28,fontWeight:700}}>0.0</div></div>
        <div className="card"><div className="kheader">Atividades Planejadas</div><div style={{fontSize:28,fontWeight:700}}>0</div></div>
      </div>
    </div>
  )
}

function Performance(){
  const {leads} = useStore()
  const total = leads.length; const fech = leads.filter(l=>l.estagio==='fechamento').length; const conv = Math.round((fech/Math.max(1,total))*1000)/10;
  return (
    <div className="container vstack">
      <h1>Performance</h1>
      <div className="grid-4">
        <div className="card"><div className="kheader">Leads no mês</div><div style={{fontSize:28,fontWeight:700}}>{total}</div></div>
        <div className="card"><div className="kheader">Conversões</div><div style={{fontSize:28,fontWeight:700}}>{fech}</div></div>
        <div className="card"><div className="kheader">Receita Gerada</div><div style={{fontSize:28,fontWeight:700}}>R$ 0</div></div>
        <div className="card"><div className="kheader">Taxa de Conversão</div><div style={{fontSize:28,fontWeight:700}}>{conv}%</div></div>
      </div>
    </div>
  )
}

function Comissoes(){
  const {leads} = useStore()
  const receb = 0
  const receber = leads.filter(l=>l.estagio==='fechamento').reduce((s,l)=> s + Math.round(calcCommission(l.credito)), 0)
  return (
    <div className="container vstack">
      <h1>Comissões</h1>
      <div className="grid-4">
        <div className="card"><div className="kheader">Recebido</div><div style={{fontSize:28,fontWeight:700}}>R$ {receb.toLocaleString()}</div></div>
        <div className="card"><div className="kheader">A Receber</div><div style={{fontSize:28,fontWeight:700}}>R$ {receber.toLocaleString()}</div></div>
        <div className="card"><div className="kheader">Futuras</div><div style={{fontSize:28,fontWeight:700}}>R$ 0</div></div>
        <div className="card"><div className="kheader">Previsão</div><div style={{fontSize:28,fontWeight:700}}>R$ {receber.toLocaleString()}</div></div>
      </div>
    </div>
  )
}

function CalculadoraBonus(){
  const [volume, setVolume] = React.useState(600_000);
  const [cancel, setCancel] = React.useState(0); // em %
  const bonus = Math.round(calcMonthlyBonus(volume, cancel/100));
  const band = pickCancelBand(cancel/100);
  return (
    <div className="container vstack">
      <h1>Calculadora de Bonificação</h1>
      <div className="hstack">
        <div className="card" style={{flex:1}} >
          <div className="kheader">Volume (R$)</div>
          <input className="input" type="number" min={0} step={1000} value={volume} onChange={e=>setVolume(Number(e.target.value)||0)} />
        </div>
        <div className="card" style={{flex:1}} >
          <div className="kheader">Cancelamentos (%)</div>
          <input className="input" type="number" min={0} max={100} step={0.1} value={cancel} onChange={e=>setCancel(Number(e.target.value)||0)} />
          <div className="small" style={{marginTop:6}}>Faixa: {band.label}</div>
        </div>
        <div className="card" style={{flex:1}} >
          <div className="kheader">Bônus Mensal</div>
          <div style={{fontSize:28,fontWeight:700}}>R$ {bonus.toLocaleString()}</div>
        </div>
      </div>
      <div className="small">Degraus conforme Revista. Observação: para evitar estorno, o cliente deve ter 8 parcelas pagas antes da exclusão.</div>
    </div>
  )
}

function Seed(){
  const {seed, clear} = useStore()
  const [n, setN] = React.useState(300)
  return (
    <div className="container vstack">
      <h1>Seed de Leads</h1>
      <div className="hstack">
        <input className="input" style={{maxWidth:200}} type="number" value={n} onChange={e=>setN(Number(e.target.value)||0)} />
        <button className="btn" onClick={()=>seed(n)}>Gerar Leads</button>
        <button className="btn gray" onClick={clear}>Limpar</button>
        <Link to="/pipeline" className="btn green">Abrir Pipeline</Link>
      </div>
      <div className="small">Gera leads distribuídos por estágio e interesses.</div>
    </div>
  )
}

function AppShell() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/seed" element={<Seed />} />
        <Route path="/planejamento" element={<Planejamento />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/comissoes" element={<Comissoes />} />
        <Route path="/bonus" element={<CalculadoraBonus />} />
        <Route path="*" element={<div className="container"><h3>404 — Página não encontrada</h3></div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default function App(){
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  )
}
