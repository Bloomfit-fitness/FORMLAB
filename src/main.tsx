import { useState } from 'react';
import {
  Activity,
  ArrowRight,
  Dumbbell,
  HeartPulse,
  Target,
  Utensils,
  Waves,
  Check,
  Clock3,
  Zap,
  Menu,
  X,
  Sparkles,
  BarChart3,
  ShieldCheck,
} from 'lucide-react';

type Goal =
  | 'Build muscle'
  | 'Get stronger'
  | 'Healthy weight gain'
  | 'Fat-loss fitness';
type Equipment = 'Full gym' | 'Dumbbells' | 'Bodyweight';
const workouts: Record<Goal, Record<Equipment, string[]>> = {
  'Build muscle': {
    'Full gym': [
      'Goblet squat · 3 × 8–12',
      'Chest press · 3 × 8–12',
      'Lat pulldown · 3 × 8–12',
      'Romanian deadlift · 3 × 8–10',
      'Plank · 3 × 30 sec',
    ],
    Dumbbells: [
      'Dumbbell squat · 3 × 8–12',
      'Floor press · 3 × 8–12',
      'One-arm row · 3 × 10 each',
      'Romanian deadlift · 3 × 10',
      'Dead bug · 3 × 8 each',
    ],
    Bodyweight: [
      'Bodyweight squat · 3 × 10',
      'Incline push-up · 3 × 6–12',
      'Glute bridge · 3 × 12',
      'Bird dog · 3 × 8 each',
      'Plank · 3 × 20 sec',
    ],
  },
  'Get stronger': {
    'Full gym': [
      'Leg press · 3 × 8',
      'Chest press · 3 × 8',
      'Seated row · 3 × 8–10',
      'Hip hinge · 3 × 8',
      'Farmer carry · 3 × 30 sec',
    ],
    Dumbbells: [
      'Dumbbell squat · 3 × 8',
      'Dumbbell press · 3 × 8',
      'Supported row · 3 × 8',
      'Hip hinge · 3 × 8',
      'Suitcase carry · 3 × 20 sec',
    ],
    Bodyweight: [
      'Squat to chair · 3 × 8–10',
      'Incline push-up · 3 × 8',
      'Hip bridge · 3 × 10',
      'Bird dog · 3 × 8 each',
      'Calf raise · 3 × 12',
    ],
  },
  'Healthy weight gain': {
    'Full gym': [
      'Goblet squat · 3 × 8–12',
      'Chest press · 3 × 8–12',
      'Seated row · 3 × 10',
      'Hip hinge · 3 × 8–10',
      'Dead bug · 3 × 8 each',
    ],
    Dumbbells: [
      'Dumbbell squat · 3 × 8–12',
      'Floor press · 3 × 8–12',
      'One-arm row · 3 × 10 each',
      'Glute bridge · 3 × 12',
      'Bird dog · 3 × 8 each',
    ],
    Bodyweight: [
      'Bodyweight squat · 3 × 10',
      'Incline push-up · 3 × 6–12',
      'Glute bridge · 3 × 12',
      'Reverse lunge · 2 × 8 each',
      'Plank · 3 × 20 sec',
    ],
  },
  'Fat-loss fitness': {
    'Full gym': [
      'Leg press · 3 × 10',
      'Chest press · 3 × 10',
      'Seated row · 3 × 10',
      'Step-ups · 2 × 8 each',
      'Easy bike · 8 min',
    ],
    Dumbbells: [
      'Dumbbell squat · 3 × 10',
      'Floor press · 3 × 10',
      'One-arm row · 3 × 10 each',
      'Step-ups · 2 × 8 each',
      'March in place · 3 × 45 sec',
    ],
    Bodyweight: [
      'Bodyweight squat · 3 × 10',
      'Incline push-up · 3 × 8',
      'Reverse lunge · 2 × 8 each',
      'Glute bridge · 3 × 12',
      'Brisk walk · 8–12 min',
    ],
  },
};
const week = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
function App() {
  const [goal, setGoal] = useState<Goal>('Build muscle');
  const [equipment, setEquipment] = useState<Equipment>('Dumbbells');
  const [days, setDays] = useState(3);
  const [experience, setExperience] = useState('Beginner');
  const [built, setBuilt] = useState(false);
  const [active, setActive] = useState(0);
  const [done, setDone] = useState<string[]>([]);
  const [menu, setMenu] = useState(false);
  const trainDays =
    days === 2
      ? [0, 3]
      : days === 3
        ? [0, 2, 4]
        : days === 4
          ? [0, 1, 3, 5]
          : [0, 1, 2, 4, 5];
  const plan = week.map((day, i) => ({
    day,
    focus: trainDays.includes(i)
      ? 'Full body ' + String.fromCharCode(65 + trainDays.indexOf(i))
      : i === 6
        ? 'Rest & reset'
        : 'Recovery & mobility',
    items: trainDays.includes(i)
      ? workouts[goal][equipment]
      : [
          'Gentle mobility · 5 min',
          'Easy walk or activity you enjoy · 10–20 min',
          'Relaxed breathing · 2 min',
        ],
  }));
  const count = plan.filter(p => p.focus.startsWith('Full body')).length;
  const current = plan[active];
  const generate = () => {
    setBuilt(true);
    setActive(trainDays[0]);
    document
      .getElementById('your-plan')
      ?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand-mark">
            <Activity size={20} />
          </span>
          form<span className="brand-light">lab</span>
          <span className="brand-dot">.</span>
        </a>
        <nav className={menu ? 'nav-links nav-open' : 'nav-links'}>
          <a href="#method" onClick={() => setMenu(false)}>
            The method
          </a>
          <a href="#moves" onClick={() => setMenu(false)}>
            Exercises
          </a>
          <a href="#your-plan" onClick={() => setMenu(false)}>
            Your plan
          </a>
        </nav>
        <a className="nav-cta" href="#plan-builder">
          Build my plan ↗
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenu(!menu)}
          aria-label="Toggle menu"
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot"></span> YOUR PERSONAL TRAINING SPACE
            </div>
            <h1>              Build strength.
              <br />
              <span>Become more</span>
              <br />
              you.
            </h1>
            <p className="hero-text">
              A training plan that meets you where you are. Build muscle, get
              stronger, and make fitness part of your life — one good session at
              a time.
            </p>
            <div className="hero-actions">
              <a className="button button-lime" href="#plan-builder">
                Create my plan <ArrowRight size={18} />
              </a>
              <a className="text-link" href="#method">
                ◉ How it works
              </a>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack">
                <span>✦</span>
                <span>↗</span>
                <span>◎</span>
              </div>
              <div>
                <strong>Your pace. Your progress.</strong>
                <small>Made for real life, not perfection.</small>
              </div>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85"
                alt="Modern gym with strength training equipment"
              />
              <div className="image-shade"></div>
              <div className="image-label">
                <span className="image-label-icon">
                  <Dumbbell size={18} />
                </span>
                <span>
                  <b>STRONGER, EVERY SESSION</b>
                  <small>Consistency over intensity.</small>
                </span>
              </div>
            </div>
            <div className="float-card float-top">
              <span className="float-icon">
                <Zap size={17} />
              </span>
              <span>
                <small>THE GOAL</small>
                <b>Progress, not pressure</b>
              </span>
            </div>
            <div className="float-card float-bottom">
              <span className="ring-chart">3×</span>
              <span>
                <b>Weekly strength</b>
                <small>A solid place to start</small>
              </span>
            </div>
            <div className="hero-stamp">MOVE • GROW • REPEAT</div>
          </div>
          <div className="hero-bottom">
            <span>01 / TRAIN WITH INTENTION</span>
            <span>SCROLL TO FIND YOUR FLOW ↓</span>
          </div>
        </section>
        <section className="stats-strip">
          <div>
            <Target />
            <span>
              <b>Built around you</b>
              <small>Your goals, your equipment</small>
            </span>
          </div>
          <div>
            <HeartPulse />
            <span>
              <b>Beginner-friendly</b>
              <small>Start simple, grow steadily</small>
            </span>
          </div>
          <div>
            <ShieldCheck />
            <span>
              <b>Health-first</b>
              <small>Rest is part of the plan</small>
            </span>
          </div>
          <div>
            <BarChart3 />
            <span>
              <b>Progress you can feel</b>
              <small>Celebrate every small win</small>
            </span>
          </div>
        </section>
        <section className="method-section section-pad" id="method">
          <div className="section-kicker">THE FORMLAB METHOD ✳</div>
          <div className="method-heading">
            <h2>
              Less guesswork.
              <br />
              <span>More good work.</span>
            </h2>
            <p>
              You don't need a perfect routine or a room full of equipment. You
              need a plan you can repeat, enough recovery, and a way to notice
              your progress.
            </p>
          </div>
          <div className="method-cards">
            <article className="method-card dark-card">
              <div className="card-number">01 / TRAIN</div>
              <div className="method-visual">
                <div className="orbit"></div>
                <Dumbbell size={56} />
                <span className="visual-pill">YOUR ROUTINE</span>
              </div>
              <h3>Move with a plan.</h3>
              <p>
                Clear exercise choices and manageable sessions — adapted to your
                space and experience.
              </p>
              <a href="#plan-builder">Find your routine ↗</a>
            </article>
            <article className="method-card lime-card">
              <div className="card-number">02 / FUEL</div>
              <div className="method-visual">
                <div className="food-circle">
                  <Utensils size={40} />
                </div>
                <span className="fuel-tag tag-one">Regular meals</span>
                <span className="fuel-tag tag-two">Protein + variety</span>
                <span className="fuel-tag tag-three">Water</span>
              </div>
              <h3>Fuel your everyday.</h3>
              <p>
                Eat regular, satisfying meals with protein, carbs, fats, and
                foods you actually enjoy.
              </p>
              <a href="#fuel">Explore the basics ↗</a>
            </article>
            <article className="method-card lilac-card">
              <div className="card-number">03 / RECOVER</div>
              <div className="method-visual">
                <div className="moon-shape"></div>
                <span className="star">✳</span>
                <span className="sleep-tag">
                  <Waves size={14} /> RESET MODE
                </span>
              </div>
              <h3>Make recovery count.</h3>
              <p>
                Muscles adapt between sessions. Sleep, rest days, and easier
                movement all matter.
              </p>
              <a href="#fuel">Build better habits ↗</a>
            </article>
          </div>
        </section>
        <section className="plan-section section-pad" id="plan-builder">
          <div className="plan-intro">
            <div className="section-kicker">YOUR STARTING POINT ✳</div>
            <h2>
              Your goals.
              <br />
              <span>Your game plan.</span>
            </h2>
            <p>
              Tell us a little about your routine. We'll shape a practical
              weekly workout template you can adjust as you learn what works for
              you.
            </p>
            <div className="plan-note">
              <Sparkles size={17} />
              <span>
                <b>No one-size-fits-all.</b> This is a starting point, not a
                test you have to pass.
              </span>
            </div>
            <div className="plan-decor">
              <div></div>
              <div></div>
              <span>
                SHOW UP
                <br />
                FOR YOU.
              </span>
            </div>
          </div>
          <div className="builder-card">
            <div className="builder-top">
              <span className="builder-step">LET'S SET YOU UP</span>
              <span className="builder-count">
                01 <i>/ 04</i>              </span>
            </div>
            <div className="builder-progress">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="builder-field">
              <label>
                01 <span>WHAT ARE YOU WORKING TOWARD?</span>
              </label>
              <div className="goal-grid">
                {(
                  [
                    'Build muscle',
                    'Get stronger',
                    'Healthy weight gain',
                    'Fat-loss fitness',
                  ] as Goal[]
                ).map((g, i) => (
                  <button
                    key={g}
                    className={
                      goal === g ? 'choice-card selected' : 'choice-card'
                    }
                    onClick={() => setGoal(g)}
                  >
                    <span className="choice-symbol">
                      {i === 0 ? (
                        <Dumbbell size={18} />
                      ) : i === 1 ? (
                        <Zap size={18} />
                      ) : i === 2 ? (
                        '↗'
                      ) : (
                        <HeartPulse size={18} />
                      )}
                    </span>
                    <span>{g}</span>
                    <span className="choice-check">
                      {goal === g ? <Check size={12} /> : ''}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="builder-field">
              <label>
                02 <span>WHERE WILL YOU TRAIN?</span>
              </label>
              <div className="segmented">
                {(['Full gym', 'Dumbbells', 'Bodyweight'] as Equipment[]).map(
                  e => (
                    <button
                      key={e}
                      className={equipment === e ? 'segment active' : 'segment'}
                      onClick={() => setEquipment(e)}
                    >
                      {e}
                    </button>
                  )
                )}
              </div>
            </div>
            <div className="builder-field">
              <label>
                03 <span>YOUR EXPERIENCE</span>
              </label>
              <div className="experience-row">
                {['Beginner', 'Some experience', 'Experienced'].map(e => (
                  <button
                    key={e}
                    className={
                      experience === e
                        ? 'experience-pill active'
                        : 'experience-pill'
                    }
                    onClick={() => setExperience(e)}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <div className="builder-field">
              <label>
                04 <span>HOW MANY DAYS FEEL REALISTIC?</span>
              </label>
              <div className="days-picker">
                {[2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    className={days === n ? 'day-option active' : 'day-option'}
                    onClick={() => setDays(n)}
                  >
                    <b>{n}</b>
                    <small>
                      {n === 2
                        ? 'Easy start'
                        : n === 3
                          ? 'Balanced'
                          : n === 4
                            ? 'More time'
                            : 'Most days'}
                    </small>
                  </button>
                ))}
              </div>
            </div>
            <button
              className="button button-dark generate-button"
              onClick={generate}
            >
              Build my weekly plan <ArrowRight size={18} />
            </button>
            <p className="builder-footnote">
              <ShieldCheck size={13} /> Free to use · Flexible by design · No
              pressure
            </p>
          </div>
        </section>
        <section className="generated-section section-pad" id="your-plan">
          <div className="section-kicker">MADE FOR YOUR WEEK ✳</div>
          <div className="generated-heading">
            <div>
              <h2>
                {built
                  ? 'Your week, mapped out.'
                  : 'A week that works for you.'}
              </h2>
              <p>
                {built
                  ? goal +
                    ' · ' +
                    equipment +
                    ' · ' +
                    days +
                    ' training days · ' +
                    experience
                  : 'Here’s a sample structure. Build your own plan above to tailor the sessions.'}
              </p>
            </div>
            {built && (
              <button
                className="reset-button"
                onClick={() => {
                  setBuilt(false);
                  setDone([]);
                }}
              >
                ↻ Reset progress
              </button>
            )}
          </div>
          <div className="week-layout">
            <div className="week-days">
              {plan.map((d, i) => (
                <button
                  key={d.day}
                  className={active === i ? 'week-day active' : 'week-day'}
                  onClick={() => setActive(i)}
                >
                  <span className="weekday-label">{d.day}</span>
                  <span className="weekday-focus">{d.focus}</span>
                  <span className="weekday-status">
                    {done.includes(d.day) ? (
                      <Check size={16} />
                    ) : d.focus.startsWith('Full body') ? (
                      <span className="empty-check"></span>
                    ) : (
                      <span className="rest-dot"></span>
                    )}
                  </span>
                </button>
              ))}
            </div>
            <div className="workout-panel">
              <div className="workout-panel-top">
                <div>
                  <span className="session-label">{current.day} / SESSION</span>
                  <h3>{current.focus}</h3>
                </div>
                <span className="duration">
                  <Clock3 size={15} />{' '}
                  {current.focus.startsWith('Full body')
                    ? '30–45 min'
                    : '10–20 min'}
                </span>
              </div>
              <p className="workout-description">
                {current.focus.startsWith('Full body')
                  ? 'Warm up gently first. Choose a version that feels controlled, and rest between sets as needed.'
                  : 'Keep this day easy. Recovery and enjoyable movement are part of building a lasting routine.'}
              </p>
              <div className="exercise-list">
                {current.items.map((item, i) => (
                  <div cl
