# Font Size Updates - October 10, 2025

## Objective
Increase font size for all small paragraphs across the entire site to match the reference paragraph size: "We deliver our work through four strategic pillars..." (text-body class)

## Reference Standard
**text-body** class - This is the target size for all body text/paragraphs throughout the site.

## Progress Tracker

### ✅ COMPLETED Components

#### 1. Footer.tsx - ALL SECTIONS UPDATED
- Contact info: text-sm → text-body ✅
- Quick Links: text-sm → text-body font-medium ✅
- Services: text-sm → text-body font-medium ✅
- Programmes: text-xs → text-body font-medium ✅
- Stay Connected text: text-sm → text-body ✅
- Core Values header: text-sm → text-body ✅
- Core Values badges: text-xs → text-body ✅
- Copyright: text-sm → text-body ✅
- Legal links: text-sm → text-body font-medium ✅
- Mission statement: text-sm → text-body ✅

#### 2. Navigation.tsx - DROPDOWNS UPDATED
- Desktop dropdown items: text-sm → text-body font-semibold ✅
- Mobile dropdown items: text-sm → text-body font-semibold ✅

### 🔄 PENDING Updates

#### High Priority (User-facing on every page)
- [ ] Contact.tsx - All text-sm paragraphs and labels
- [ ] Hero.tsx - Stats text and tagline
- [ ] CorePrinciples.tsx - Card descriptions
- [ ] About.tsx - Sector and department descriptions (text-xs → text-body)
- [ ] Team.tsx - Member bios and tags
- [ ] OTCFramework.tsx - Step descriptions (text-sm → text-body)
- [ ] OTCFrameworkComponent.tsx - Sector/dept descriptions (text-sm → text-body)

#### Homepage Components
- [ ] HomeHighlights.tsx - Card text
- [ ] HomeAbout.tsx - Description text (text-sm → text-body)
- [ ] HomeContact.tsx - Contact info paragraphs
- [ ] HomeNewsletter.tsx - Form labels and descriptions

#### Product/Service Pages
- [ ] AreasOfWork.tsx - Feature descriptions
- [ ] Services.tsx - Service descriptions (text-sm → text-body)
- [ ] Programs.tsx - Program objectives (text-sm → text-body)
- [ ] ProductsOverview.tsx - Feature lists
- [ ] ServicesComponent.tsx - Service details (text-xs → text-body)

#### Individual Product Pages
- [ ] StrategicLitigationPage.tsx - Case details (text-sm → text-body)
- [ ] InnovationsPage.tsx - Innovation descriptions
- [ ] ConsultancyPage.tsx - Service features (text-sm → text-body)
- [ ] CenterForDigitalJusticePage.tsx - Program details
- [ ] ShortCoursesPage.tsx - Course descriptions (text-sm → text-body)

#### Programme Pages
- [ ] ProgrammesPage.tsx - Programme descriptions (text-sm → text-body)
- [ ] TSGPage.tsx - Programme details
- [ ] AiNowPage.tsx - Programme details
- [ ] BiTAPage.tsx - Document descriptions (text-sm → text-body), link text
- [ ] EMTPage.tsx - Programme details

#### Other Pages
- [ ] WhatWeDoPage.tsx - Approach descriptions (text-sm → text-body)
- [ ] OurProductsPage.tsx - Table cells, service lists (text-sm → text-body)
- [ ] NewsUpdatesPage.tsx - News item details (text-sm → text-body)
- [ ] DonatePage.tsx - Payment info, form labels (text-sm → text-body, text-xs → text-body)
- [ ] NewsletterPage.tsx - Form labels and descriptions (text-sm/xs → text-body)

#### Supporting Components
- [ ] WhoWeAre.tsx - Description paragraphs (text-sm → text-body)
- [ ] OurValues.tsx - Value descriptions
- [ ] FocusAreas.tsx - Area descriptions
- [ ] StrategicPillars.tsx - Pillar descriptions (text-sm → text-body, text-xs → text-body)
- [ ] OurApproach.tsx - Activity descriptions (text-sm → text-body)
- [ ] OTCFrameworkDiagram.tsx - All text instances

## Pattern to Follow

### For Body Text/Paragraphs:
```tsx
// OLD
<p className="text-sm text-muted-foreground">Content</p>

// NEW
<p className="text-body text-muted-foreground">Content</p>
```

### For List Items/Features:
```tsx
// OLD
<span className="text-sm text-muted-foreground">Item</span>

// NEW
<span className="text-body text-muted-foreground">Item</span>
```

### For Small Labels/Tags:
```tsx
// OLD
<span className="text-xs bg-primary/10">Tag</span>

// NEW
<span className="text-body bg-primary/10">Tag</span>
```

### For Links:
```tsx
// OLD
<Link className="text-sm text-muted-foreground hover:text-primary">

// NEW
<Link className="text-body font-medium text-muted-foreground hover:text-primary">
```

### For Form Labels:
```tsx
// OLD
<label className="block text-sm font-medium text-foreground mb-2">

// NEW
<label className="block text-body font-medium text-foreground mb-2">
```

## Notes
- text-xs should become text-body
- text-sm should become text-body
- Add font-medium to links for better readability
- Add font-semibold to navigation dropdown items for emphasis
- The text-body class maintains consistent sizing across the site
- Already using text-body: Main paragraph descriptions are already correct

## Estimated Impact
- **Files to update**: ~50 files
- **Text elements to update**: ~500+ individual instances
- **User experience**: Significantly improved readability across all pages
- **Consistency**: All body text now matches the strategic pillars reference paragraph

## Testing Checklist
After all updates:
- [ ] Check Footer on all pages
- [ ] Test all navigation dropdown menus
- [ ] Verify homepage sections
- [ ] Check all product/service pages
- [ ] Test all programme pages  
- [ ] Verify form labels are readable
- [ ] Check card descriptions
- [ ] Test OTC Framework diagrams
- [ ] Verify donate and newsletter pages
- [ ] Check responsive behavior on mobile/tablet

## Completion Date
Started: October 10, 2025
Estimated Completion: [To be filled]
