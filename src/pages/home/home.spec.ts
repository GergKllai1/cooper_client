import { HomePage } from './home';
import { TestBed, async } from "@angular/core/testing";
import { IonicModule, Platform, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { PlatformMock, StatusBarMock, SplashScreenMock, NavControllerMock } from "ionic-mocks";

describe('Homepage', () => {
    let fixture, homepage;

    beforeEach(async(() => { 
        TestBed.configureTestingModule({
            declarations: [
                HomePage
            ],
            imports: [IonicModule.forRoot(HomePage)],
            providers: [
                { provide: Platform, userFactory: () => PlatformMock.instance() },
                { provide: StatusBar, userFactory: () => StatusBarMock.instance() },
                { provide: SplashScreen, userFactory: () => SplashScreenMock.instance() },
                { provide: NavController, userFactory: () => NavControllerMock.instance() },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        homepage = fixture.componentInstance;
    });

    it('should create the home page', () => {
        expect(homepage).toBeTruthy();
        expect(homepage instanceof HomePage).toEqual(true);
    });

    it('should have user default values', () => {
        expect(homepage.user).toEqual({ distance: 1000, age: 20});
    });

    it('should have calculate funciton', () => {
        spyOn(homepage, 'calculate');

        homepage.calculate();

        expect(homepage.calculate).toHaveBeenCalled();
    });
});